const jwt = require("jsonwebtoken")
const Product = require("../models/productModel")
const User = require("../models/userModel")

module.exports = {

    authenticate (req, res, next) {
        
        try {
            console.log(key._doc)
            const key = jwt.verify(req.headers.token, env.process.KEY)
            req.userID = key._doc._id
            next()

        }
        catch(err){
            res.status(401).json({
                message: "unauthenticated"
            })
        }
    },

    authorize (req, res, next) {

        try {
            User.findById(req.params.id, {
            })
            .then(productData => {
                const access = jwt.verify(req.headers.token, env.process.KEY)
                if (String(productData.user) === access._doc._id) {
                    next()
                } 
                else {   
                    res.status(401).json({
                        message: "Unauthorized"
                    })
                }
            })
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                message: "internal server error"
            })

        }
    },

    adminAuthorize (req, res, next) {

        try {
            User.findById(access.id, {
            })
            console.log(access.id)
            const access = jwt.verify(req.headers.token, env.process.KEY)
            .then(adminData => {
                if(adminData.user === access.id){
                    next()
                }
                else {
                    res.status(401).json({
                        message: "Unauthorized"
                    })
                }
            })
            next()
        }
        catch (err){
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

}