const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const authorization = require('./middleware/auth')
const getController = require('./controller/getController')
const inventryController = require('./controller/inventryController')
// store create by admin only
router.post('/createStore/:userId', authorization.auth, userController.StoreRegistration)

router.get('/getidAndtitlefromgoogleApi', userController.getbookIdfromgoogle)
 // user Registration APi
router.post('/register', userController.registration )
// userLogin api with jwt token
router.post('/login', userController.loginUser)
//list all the store of the user


router.get('/getStore',getController.getStore)
// list all the book in inventry which is not deleted
router.get('/getList', getController.listBooks)

// add book to inventry
router.post('/addBook/:userId/:storeId',authorization.auth, inventryController.addBook )

// update a book in inventry
router.put('/updateBook/:userId/:inventryId' , authorization.auth,inventryController.updateBook)

//remove book from inventry
router.delete('/deleteBook/:userId/:inventryId', authorization.auth,inventryController.removeBook)







module.exports = router