const mongoose = require("mongoose")
const { Schema } = mongoose 

const productSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function (desc){
                desc.length > 10
            },
            message: "Description is too short"
        }
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product