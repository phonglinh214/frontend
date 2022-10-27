const mongoose = require("mongoose")

var LegoSchema = new mongoose.Schema({
    name: String,
    type: String,
    year: String,
    image: String,
    price: String,
    

}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var LegoModel = mongoose.model('lego', LegoSchema, 'lego')
module.exports = LegoModel