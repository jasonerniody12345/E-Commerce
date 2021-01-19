const User = require("../models/userModel")
const Product = require("../models/productModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {

    login (req, res){
        User.findOne({email: req.body.email})
        .then(userLogin => {
            console.log(typeof(req.body.email))
            console.log(typeof(req.body.password))
            console.log(err.errors)
            console.log(userLogin)
            console.log(userLogin.password)
            if (bcrypt.compareSync(req.body.password, userLogin.password) === true) {
                const token = jwt.sign ({...userLogin}, env.process.KEY)
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
        })
        .catch(err => {
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
        })
        
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
        .populate("product")
        .then(userOne => {
            for (var i = 0; i < user.length; i++) {
                user[i].fullName = user[i].first_name + user[i].last_name
            }
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

    register (req, res) {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            shoppingCart: req.body.shoppingCart,
            isAdmin: req.body.isAdmin
        })
        .then(createUser => {
            console.log("Successfully created new user")
            res.status(201).json({
                message: "Successfully created new user",
                createUser
            })
        })
        .catch(err => {
            console.log(err)
            if (err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            }
            else {
                console.log(err)
                res.status(500).json({
                    message: "Internal server error"
                })
            }
        })
    },

    update (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            shoppingCart: req.body.shoppingCart,
            isAdmin: req.body.isAdmin
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
            const productStock = foundProduct.stock - 1
            if (cart.stock > 0){
                User.findByIdAndUpdate (req.params.id, { 
                    $push: {
                        cart
                    }
                })
                .then (updateUser => {
                    Product.findByIdAndUpdate (req.params.id, {
                        stock : productStock
                    })
                })
            }
            else {
                res.status(401).json({
                    message: "Product is out of stock"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    }

}