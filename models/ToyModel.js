const mongoose = require("mongoose")

var ToySchema = new mongoose.Schema({
    name: String,
    brand: String,
    type: String,
    year: String,
    image: String,
    price: Number,
    

}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var ToyModel = mongoose.model('toy', ToySchema, 'toy')
module.exports = ToyModel