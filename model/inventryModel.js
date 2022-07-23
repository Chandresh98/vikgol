const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const inventryModel = new mongoose.Schema({
    bookid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    authors:{
        type: [String],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    stock: {
        type: Number
    },
    outOfStock: {
        type: Boolean

    },
    storeId:{
        type:ObjectId,
        ref:"storeCollection",
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })

module.exports = mongoose.model('inventryCollection', inventryModel)