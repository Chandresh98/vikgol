const inventryModel = require('../model/inventryModel')
const userModel = require('../model/userModel')
const storeModel = require('../model/storeModel')


const addBook = async function (req, res) {
    try {
        const data = req.body
        let userId = req.params.userId
        let storeId = req.params.storeId

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ Status: false, message: "Please enter valid userid" })
        }

        if (!validator.isValidObjectId(storeId)) {
            return res.status(400).send({ Status: false, message: "Please enter valid storeId" })
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like firstname lastname" })
        }
        const { bookid, title, subtitle, authors, description, stock } = data
        if (!validator.isValid(bookid)) {
            return res.status(400).send({ status: false, massage: "please enter bookid" })
        }

        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, massage: "please enter title" })
        }
        if (!validator.isValid(subtitle)) {
            return res.status(400).send({ status: false, massage: "please enter subtitle" })
        }
        if (!validator.isValid(authors)) {
            return res.status(400).send({ status: false, massage: "please enter authors" })
        }
        if (!validator.isValid(description)) {
            return res.status(400).send({ status: false, massage: "please enter description" })
        }
        if (!validator.isValid(stock)) {
            return res.status(400).send({ status: false, massage: "please enter stock" })
        }
        let userDetails = await userModel.findById(userId)
        if (!userDetails) {
            return res.status(404).send({ Status: false, message: "The user is not found" })
        }

        let storeDetails = await storeModel.findById(storeId)
        if (!storeDetails) {
            return res.status(404).send({ Status: false, message: "The store is not found" })
        }
        data.storeId = storeDetails._id
        if (userDetails.profile == "user") {
            return res.status(403).send({ Status: false, message: "Admin can Add book to store" })
        }

        if (userId == req.decodedToken.userId) {
            let createStore = await inventryModel.create(data)
            return res.status(201).send({ status: true, message: "successful", data: createStore })
        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const updateBook = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId
        let inventryIde = req.params.inventryId
        if (!validator.isValidObjectId(inventryIde)) {
            return res.status(400).send({ Status: false, message: "Please enter valid inventryId" })
        }

        let findInventry = await inventryModel.findOne({ _id: inventryIde, isDeleted: false })
        if (!findInventry) {
            return res.status(404).send({ status: false, message: "Inventry Not Found" })
        }

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ Status: false, message: "Please enter valid userid" })
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like firstname lastname" })
        }
        let userDetails = await userModel.findById(userId)
        if (!userDetails) {
            return res.status(404).send({ Status: false, message: "The user is not found" })
        }




        if (req.decodedToken.userId = userId) {
            const { title, subtitle, authors, description, stock } = data
            let final = {}
            if (validator.isvalid(title)) {
                final['title'] = title
            }

            if (validator.isvalid(subtitle)) {
                final['subtitle'] = subtitle
            }

            if (validator.isvalid(authors)) {
                final['authors'] = authors
            }
            if (validator.isvalid(description)) {
                final['description'] = description
            }
            if (validator.isvalid(stock)) {
                if (stock == 0) {
                    final['outOfStock'] = true
                }
                final['stock'] = stock
            }

            let updated = await inventryModel.findOneAndUpdate({ _id: inventryIde }, { $set: final }, { new: true })

            return res.status(200).send({ status: true, message: "data updated successfully", data: updated })

        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const removeBook = async function (req, res) {
    try {
        let userId = req.params.userId
        let inventryIde = req.params.inventryId

        if (!validator.isValidObjectId(inventryIde)) {
            return res.status(400).send({ Status: false, message: "Please enter valid inventryId" })
        }
        let findInventry = await inventryModel.findOne({ _id: inventryIde, isDeleted: false })
        if (!findInventry) {
            return res.status(404).send({ status: false, message: "Inventry Not Found" })
        }

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ Status: false, message: "Please enter valid userid" })
        }

        let userDetails = await userModel.findById(userId)
        if (!userDetails) {
            return res.status(404).send({ Status: false, message: "The user is not found" })
        }
        if (req.decodedToken.userId = userId) {

            let delet = await inventryModel.findByIdAndUpdate({_id:inventryIde},{$set:{isDeleted:true}},{new:true})
            return res.status(200).send({ status: true, message: "successfull delected", data: deleteProduct })

        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.addBook = addBook
module.exports.updateBook = updateBook
module.exports.removeBook = removeBook