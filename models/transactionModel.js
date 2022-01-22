const mongoose = require("mongoose")
const { Schema } = mongoose 

const transactionSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product:[
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    address: {
        type: String,
        required: true,
        validate: {
            validator: function (add){
                add.length > 10
            },
            message: "address is too short"
        }
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (num){
                num.length > 11
            },
            message: "phone number is too short"
        }
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction