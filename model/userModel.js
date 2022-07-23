const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim:true
    },
    profile:{
        type:String,
        enum:["Admin","user"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
       street:{type:String},
       city:{type:String},
       pincode:{type:String}
       
    }
}, { timestamps: true })

module.exports = mongoose.model('userCollection', userModel)