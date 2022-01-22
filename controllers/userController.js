const User = require("../models/userModel")
const Product = require("../models/productModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {

    // login (req, res){
    //     User.findOne({email: req.body.email})
    //         .then(userEmail => {
    //             if (req.body.email === userEmail.email) {
    //                 User.findOne({email: req.body.email})
    //                 .then(userLogin => {
    //                     if (bcrypt.compareSync(req.body.password, userLogin.password) === true) {
    //                         const token = jwt.sign ({...userLogin}, process.env.KEY)
    //                         console.log("Sucessfully login")
    //                         res.status(201).json({
    //                             message: "Sucessfully login",
    //                             accessToken: token
    //                         })
    //                     }
    //                     else {
    //                         res.status(401).json({
    //                             message: "password or email is invalid"
    //                         })
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.log(err)
    //                     if (err.errors.email){
    //                         res.status(400).json({
    //                             message: err.errors.email.message
    //                         })
    //                     }
    //                     else if (err.errors.password) {
    //                         res.status(400).json({
    //                             message: err.errors.password.message
    //                         })
    //                     }
    //                 })
    //             }
    //             else {
    //                 res.status(400).json({
    //                     message: "Email didnt exist"
    //                 })
    //             }
    //         })
    // },


    async login (req, res) {
        // for handlinng null pinter exception tambahin userEmail && didepan if (req.body.email === userEmail.email)
        // shortcut check null if(!userEmail){console.log("email salah")}
        try {
                let userEmail = await User.findOne({email: req.body.email})
                if (userEmail && req.body.email === userEmail.email) {
                    let userLogin = await User.findOne({email: req.body.email})
                    if (bcrypt.compareSync(req.body.password, userLogin.password) === true) {
                        const token = jwt.sign ({...userLogin}, process.env.KEY)
                        console.log("Sucessfully login")
                        res.status(201).json({
                            message: "Sucessfully login",
                            accessToken: token
                        })
                    }
                    else {
                        res.status(401).json({
                        message: "password or email is invalid"
                    })
                }
            }
            else {
                res.status(400).json({
                    message: "Email didnt exist"
                })
            }
        }
        catch (err) {
            console.log(err)
            if (err.errors.email){
                res.status(400).json({
                message: err.errors.email.message
                })
            }
            else if (err.errors.password) {
                res.status(400).json({
                message: err.errors.password.message
                })
            }
        }
    },
    
    // register (req, res) {
    //     User.find({email: req.body.email})
    //         .then(getEmail => {
    //             if (getEmail.length === 0) {
    //                 User.create({
    //                     first_name: req.body.first_name,
    //                     last_name: req.body.last_name,
    //                     email: req.body.email,
    //                     password: req.body.password
    //                 })
    //                 .then(createUser => {
    //                     console.log("Successfully created new user")
    //                     res.status(201).json({
    //                         message: "Successfully created new user",
    //                         createUser
    //                     })
    //                 })
    //                 .catch(err => {
    //                     console.log(err)
    //                     if (err.errors.email) {
    //                         res.status(400).json({
    //                             message: err.errors.email.message
    //                         })
    //                     }
    //                     else if (err.errors.password) {
    //                         res.status(400).json({
    //                             message: err.errors.password.message
    //                         })
    //                     }
    //                     else {
    //                         console.log(err)
    //                         res.status(500).json({
    //                             message: "Internal server error"
    //                         })
    //                     }
    //                 })
    //             }
    //             else {
    //                 console.log("Email is in used, please choose another email")
    //                 res.status(400).json({
    //                     message: "Email is in used, please choose another email"
    //                 })
    //             }
    //         })
    // },

    async register (req, res) {
        try {
            let getEmail = await User.find({email: req.body.email}) 
            if (getEmail.length === 0) {
                let createUser = await User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password
                })
                console.log("Successfully created new user")
                res.status(201).json({
                    message: "Successfully created new user",
                    createUser
                })
            }
            else {
                console.log("Email is in used, please choose another email")
                res.status(400).json({
                    message: "Email is in used, please choose another email"
                })
            }
        }
        catch (err) {
            console.log(err)
            if (err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            }
            else if (err.errors.password) {
                res.status(400).json({
                    message: err.errors.password.message
                })
            }
            else {
                console.log(err)
                res.status(500).json({
                    message: "Internal server error"
                })
            }
        }
    },

    get (req, res) {
        User.find({
        })
        .then(user => {
            console.log("Displaying all the registered user")
            res.status(201).json({
                message: "Displaying all the registered user",
                user
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    getOne (req, res) {
        User.findById(req.params.id, {
        })
        .populate("cart")
        .then(userOne => {
            console.log(userOne)
            console.log("Displaying specific user")
            res.status(201).json({
                message: "Display specific user",
                userOne
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

        
    update (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        })
        .then(updateUser => {
            console.log("Successfully updated specific user")
            res.status(201).json({
                message: "Sucessfully updated specific user",
                updateUser
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    delete (req, res) {
        User.findByIdAndDelete(req.params.id, {
        })
        .then(deleteUser => {
            console.log("Successfully deleted specific user")
            res.status(201).json({
                message: "Sucessfully deleted specific user",
                deleteUser
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    AddToCart (req, res) {
        Product.findById(req.body.productId,{
        })
        .then (foundProduct => {
            //console.log("====", foundProduct)
            if(foundProduct === null){
                res.status(401).json({
                    message: "Product not found"
                })
            }
            // else {
                else if (foundProduct.stock > 0){
                    User.findByIdAndUpdate (req.params.id, { 
                        $push: {
                            cart: req.body.productId
                        }
                    },
                    {new: true})
                    .then (updateUser => {
                        console.log(updateUser)
                        res.status(201).json({
                            updateUser
                        })
                    })
                }
                else {
                    res.status(401).json({
                        message: "Product is out of stock"
                    })
                }
        //    }

        })
        .catch(err => {
            console.log(err)
            if (err.kind === "ObjectId") {
                console.log("Product does not exists")
                res.status(401).json({
                    message: "Product does not exists"
                })
            }
            else {
                res.status(500).json({
                    message: "Internal server error"
                })          
            }
        })
    },

    removeFromCart(req, res) {
        Product.findById(req.body.productId,{
        })
        .then (foundProduct => {
            //console.log("====", foundProduct)
            if(foundProduct === null){
                res.status(401).json({
                    message: "Product not found"
                })
            }
            else {
                User.findByIdAndUpdate (req.params.id, { 
                    $pull: {
                        cart: req.body.productId
                    }
                },
                {new: true})
                .then (updateUser => {
                    console.log(updateUser)
                    res.status(201).json({
                        updateUser
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
            if (err.kind === "ObjectId") {
                console.log("Product does not exists")
                res.status(401).json({
                    message: "Product does not exists"
                })
            }
            else {
                res.status(500).json({
                    message: "Internal server error"
                })          
            }
        })
    },

    verify (req, res) {
        try {
            const key = jwt.verify(req.headers.token, process.env.KEY)
            res.status(200).json({
                message: "authenticated"
            })
        }
        catch (err) {
            res.status(401).json({
                message: "unauthenticated"
            })
        }
    }

}