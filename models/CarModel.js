const mongoose = require("mongoose")

var CarSchema = new mongoose.Schema({
    name: String,
    color: String,
    bestseller: String,
    date: Date,
    image: String,
    

}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var CarModel = mongoose.model('car', CarSchema, 'car')
module.exports = CarModel