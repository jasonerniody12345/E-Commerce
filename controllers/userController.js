const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {

    login (req, res){
        User.findOne({email: req.body.email})
        .then(login => {
            if (bcrypt.compareSync(req.body.password, login.password) === true) {
                const token = jwt.sign ({...login}, env.process.KEY)
                console.log("Sucessfully login")
                res.status(201).json({
                    message: "Sucessfully login",
                    accessToken: token
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
            for (var i = 0; i < user.length; i++) {
                user[i].fullName = user[i].first_name + user[i].last_name
            }
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
            console.log(req.body.first_name)
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
        User.findById(req.body.ProductId, {
            $push: {
                cart: req.body.cart
            }
        }, {new: true})
        .then (cart => {
            res.status(200).json({
                cart
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    }

}