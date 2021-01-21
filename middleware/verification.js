const jwt = require("jsonwebtoken")
const Product = require("../models/productModel")
const User = require("../models/userModel")

module.exports = {

    authenticate (req, res, next) {
        
        console.log(req.headers.token)
        try {
            const key = jwt.verify(req.headers.token, process.env.KEY)
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
            .then(foundData => {
                //console.log(foundData)
                const access = jwt.verify(req.headers.token, process.env.KEY)
                if (String(foundData._id) === access._doc._id) {
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
            User.findById(req.userID, {
            })
            .then(adminData => {
                // console.log(adminData)
                if(adminData.isAdmin === true){
                    next()
                }
                else {
                    res.status(401).json({
                        message: "Unauthorized"
                    })
                }
            })
        }
        catch (err){
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

}