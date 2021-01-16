const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { Schema } = mongoose 

const userSchema = new Schema({
    first_name : {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (email){
                email.length > 5
            },
            message: "Please input a valid email"
        }
    },
    shoppingCart: {
        type: Number
    },
    isAdmin: {
        type: Boolean
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password minimum length is 6"]
    }
    
})

userSchema.pre("save", function (next) {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
        this.admin = false
        
        next()
    }
    catch(error){
        next(error)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User