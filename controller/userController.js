const validator = require('../middleware/validator')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')
const axios = require('axios')
const storeModel = require('../model/storeModel')

const StoreRegistration = async function(req,res){
    try{
        let data = req.body
        let userId = req.params.userId

        if (!validator.isValidObjectId(userId)){
             return res.status(400).send({ Status: false, message: "Please enter valid userid" }) 
            }
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like firstname lastname" })
        }
        const { storeId,storeName,address} = data
        if (!validator.isValid(storeId)) {
            return res.status(400).send({ status: false, massage: "please enter storeId" })
        }

        if (!validator.isValid(storeName)) {
            return res.status(400).send({ status: false, massage: "please enter storeName" })
        }

        if (!validator.isValid(address.street)) {
            return res.status(400).send({ status: false, massage: "please enter street address" })
        }
        if (!validator.isValid(address.city)) {
            return res.status(400).send({ status: false, massage: "please enter city address" })
        }
        if (!validator.isValid(address.pincode)) {
            return res.status(400).send({ status: false, massage: "please enter pincode address" })
        }
       let userDetails = await userModel.findById(userId)
       if(!userDetails){
        return res.status(404).send({ Status: false, message: "The user is not found" }) 
       }
       if (userDetails.profile == "user"){
         return res.status(403).send({ Status: false, message: "Admin can crate store" }) 
        }
   
        if(userId==req.decodedToken.userId){
            let createStore = await storeModel.create(data)
            return res.status(201).send({ status: true, message: "successful", data: createStore })
        }else{
            return res.status(403).send({ status: false, message: "authorization denied" })
        }
        

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })  
    }
}

const registration = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like firstname lastname" })
        }
        const { fullName, profile, email, phone, password, address } = data
        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, massage: "please enter fullName" })
        }

        if (!validator.isValid(profile)) {
            return res.status(400).send({ status: false, massage: "please enter profile" })
        }
        let pro = ["Admin", "user"]
        if (!pro.includes(profile)) {
            return res.status(400).send({
                status: false, message: " Please Enter Profile in formate Admin or user ...it is required"
            })
        }


        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, massage: "please enter email" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, massage: "please enter correct email" })
        }

        if (!validator.isValid(phone)) {
            return res.status(400).send({ status: false, massage: "please enter phone" })
        }
        if (!validator.isValidPhone(phone)) {
            return res.status(400).send({ status: false, massage: "Enter Correct mobile Number" })
        }
        let mobileNumber = await userModel.findOne({ phone: phone })
        if (mobileNumber) {
            return res.status(400).send({ status: false, massage: "mobile Number alrady exist" })
        }


        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, massage: "please enter password" })
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 6 to 15 password" })
        }

        if (!validator.isValid(address.street)) {
            return res.status(400).send({ status: false, massage: "please enter street address" })
        }
        if (!validator.isValid(address.city)) {
            return res.status(400).send({ status: false, massage: "please enter city address" })
        }
        if (!validator.isValid(address.pincode)) {
            return res.status(400).send({ status: false, massage: "please enter pincode address" })
        }

        let createUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "successful", data: createUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const loginUser = async (req, res) => {
    try {
        Data = req.body

        if (Object.keys(Data) == 0) {
            return res.status(400).send({ status: false, message: "Please provide email id or password" })
        }
        const { email, password } = Data;
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: `Email is not correct ` })
        }

        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, message: `password is required` })
            return
        }

        const findUser = await userModel.findOne({ email: email, password: password })
        if (!findUser) {
            return res.status(404).send({ status: false, message: "No user found" })
        }

        const token = jwt.sign({
            userId: findUser._id,
        }, "Vikgol",
        );
        res.setHeader('authorization', token);

        return res.status(200).send({ status: true, message: "Successful Login", Token: token })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const getbookIdfromgoogle = async function (req, res) {
    let titl = req.query.title
    let data = []
    let googleBookApi = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titl}`)
    let itemIngoogleApi = googleBookApi.data.items
    for (let i = 0; i < itemIngoogleApi.length; i++) {
        data[i] = {
            id: itemIngoogleApi[i].id,
            title: itemIngoogleApi[i].volumeInfo.title,
            subtitle: itemIngoogleApi[i].volumeInfo.subtitle,
            authors: itemIngoogleApi[i].volumeInfo.authors,
            discription: itemIngoogleApi[i].volumeInfo.description
        }
    }
    return res.status(200).send({ status: true, totalCount: data.length, data: data })
}

module.exports.registration = registration
module.exports.loginUser = loginUser
module.exports.getbookIdfromgoogle = getbookIdfromgoogle
module.exports.StoreRegistration=StoreRegistration