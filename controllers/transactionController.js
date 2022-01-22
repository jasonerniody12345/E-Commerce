const { QueryCursor } = require("mongoose")
const Transaction = require("../models/transactionModel")

module.exports = { 

    create(req, res) {
        Transaction.create({
            name: req.body.name,
            address: req.body.name,
            phoneNumber: req.body.name,
        })
        .then(createTransaction => {
            console.log("successfully created new transaction")
            res.status(201).json({
                message: "successfully created new transaction",
                createTransaction
            })
        })
        .catch(err => {
            console.log(err)
            if (err.errors.description) {
                res.status(400).json({
                    message: err.errors.description.message
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
        Transaction.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            address: req.body.name,
            phoneNumber: req.body.name,
        })
        .then(updateTransaction => {
            console.log("successfully updated transaction")
            res.status(201).json({
                message: "sucessfully updated transaction",
                updateTransaction
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    delete (req, res){
        Transaction.findByIdAndDelete(req.params.id, {
        })
        .then(deleteTransaction => {
            console.log("succesfully deleted transaction")
            res.status(201).json({
                message: "sucessfully deleted transaction",
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    get (req, res) {
        Transaction.find({
        })
        .then(getTransaction => {
            console.log("Displaying all listed transaction")
            res.status(201).json({
                getTransaction
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
        Transaction.findById(req.params.id,{
        })
        .then(getTransaction => {
            console.log("Displaying specific listed transaction")
            res.status(201).json({
                getTransaction
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    checkout(req, res) {
        Transaction.findById(req.params.id, {
        })
        .then(foundTransaction => {
            if(foundTransaction === null){
                message: "Transaction not found"
                res.status(401).json({
                    message: "Transaction not found"
                })
            }
            else if (foundTransaction.stock > 0) {
                const productStock = foundProduct.stock - 1
                Product.findByIdAndUpdate (req.params.id, {
                    $pull: {
                        cart: req.body.product.id
                    }
                },
                {new: true})
                .then (updateTransaction => {
                    console.log(updateTransaction)
                    Product.findByIdAndUpdate (req.body.productId, {
                        stock : productStock
                    })
                })
                .then(updatedTransaction => {
                    res.status(201).json({
                        updateTransaction
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
    }
}








