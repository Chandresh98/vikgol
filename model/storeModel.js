const mongoose = require('mongoose')
const storeModel = new mongoose.Schema({
   storeId:{
    type:String,
    required:true
   },
   storeName:{
    type:String,
    required:true
   },
   address: {
    street:{type:String},
    city:{type:String},
    pincode:{type:String}
    
 }

}, { timestamps: true })

module.exports = mongoose.model('storeCollection', storeModel)