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

    // authorize (req, res, next) {

    //     try {
    //         User.findById(req.params.id, {
    //         })
    //         .then(foundData => {
    //             const access = jwt.verify(req.headers.token, process.env.KEY)
    //             if (String(foundData._id) === access._doc._id) {
    //                 next()
    //             }
    //             if (!foundData) {
    //                 return res.status(404).json({
    //                     message: "User not found"
    //                 });
    //             } 
    //             else {   
    //                 res.status(401).json({
    //                     message: "Unauthorized"
    //                 })
    //             }
    //         })
    //     }
    //     catch(err){
    //         console.log(err)
    //         res.status(500).json({
    //             message: "internal server error"
    //         })
    //     }
    // },

    authorize(req, res, next) {

        try {
            // Log the ID to ensure it's being passed correctly
            console.log("User ID from request params:", req.params.id);
    
            User.findById(req.params.id)
                .then(foundData => {
                    // Log the user data to check if it is null
                    console.log("Found user data:", foundData);
    
                    if (!foundData) {
                        return res.status(404).json({ message: "User not found" });
                    }
    
                    // Verify the token and extract the user ID from the token
                    const access = jwt.verify(req.headers.token, process.env.KEY);
    
                    // Log the decoded access token
                    console.log("Decoded token:", access);
    
                    // Check if the user ID from the token matches the user ID from the database
                    if (String(foundData._id) === String(access._doc._id)) {
                        return next();  // Proceed to next middleware or route handler
                    } else {
                        return res.status(401).json({ message: "Unauthorized" });
                    }
                })
                .catch(err => {
                    console.log("Error finding user:", err);
                    if (!res.headersSent) {
                        // Only send response if headers haven't been sent already
                        return res.status(500).json({ message: "Internal server error" });
                    }
                });
        } catch (err) {
            console.log("Error in authorization middleware:", err);
            if (!res.headersSent) {
                // Check if headers are already sent before responding
                return res.status(500).json({ message: "Internal server error" });
            }
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