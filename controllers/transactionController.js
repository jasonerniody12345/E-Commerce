const { QueryCursor } = require("mongoose")
const User = require("../models/userModel"); // Adjust the path according to your directory structure
const Transaction = require("../models/transactionModel")
const Product  = require("../models/transactionModel")

module.exports = { 

    // create(req, res) {
    //     Transaction.create({
    //         name: req.body.name,
    //         address: req.body.address,
    //         phoneNumber: req.body.phoneNumber,
    //     })
    //     .then(createTransaction => {
    //         console.log("successfully created new transaction")
    //         res.status(201).json({
    //             message: "successfully created new transaction",
    //             createTransaction
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         if (err.errors.description) {
    //             res.status(400).json({
    //                 message: err.errors.description.message
    //             })
    //         }
    //         else {
    //             console.log(err)
    //             res.status(500).json({
    //                 message: "Internal server error"
    //             })
    //         }
    //     })   
    // },

        create(req, res) {
            // Destructuring input data from the request body
            const { userId, name, address, phoneNumber } = req.body;
    
            // Check if the user exists first
            User.findById(userId)
                .then(foundUser => {
                    if (!foundUser) {
                        return res.status(404).json({ message: "User not found" });
                    }
    
                    // If user exists, create the transaction
                    return Transaction.create({
                        name,
                        address,
                        phoneNumber,
                        userId, 
                        cart: foundUser.cart
                    });
                })
                .then(createTransaction => {
                    // Populate both the userId and the cart of the user
                    return createTransaction.populate({
                        path: 'userId',
                        populate: {
                            path: 'cart', // Populate the cart field, which contains references to Product
                            model: 'Product', // The model to populate for the cart
                        },
                    }).execPopulate();
                })
                .then(populatedTransaction => {
                    console.log("Successfully created and populated new transaction");
    
                    // Prepare response to include user details and their cart
                    const responseTransaction = {
                        ...populatedTransaction.toObject(),
                        cart: populatedTransaction.userId.cart,  // Include the cart field
                    };
    
                    res.status(201).json({
                        message: "Successfully created new transaction",
                        createTransaction: responseTransaction,
                    });
                })
                .catch(err => {
                    console.log(err);
                    if (err.errors) {
                        // Handle validation errors
                        res.status(400).json({
                            message: err.errors,
                        });
                    } else {
                        // Handle other errors
                        res.status(500).json({
                            message: "Internal server error",
                        });
                    }
                });
        },

    update (req, res) {
        Transaction.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
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
                deleteTransaction
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
        .populate('userId') 
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

    // checkout(req, res) {
    //     Transaction.findById(req.body.transactionId, {
    //     })
    //     .then(foundTransaction => {
    //         if(foundTransaction === null){
    //             message: "Transaction not found"
    //             res.status(401).json({
    //                 message: "Transaction not found"
    //             })
    //         }
    //         else if (foundTransaction.stock > 0) {
    //             const productStock = foundProduct.stock - 1
    //             Product.findByIdAndUpdate (req.params.id, {
    //                 $pull: {
    //                     cart: req.body.product.id
    //                 }
    //             },
    //             {new: true})
    //             .then (updateTransaction => {
    //                 console.log(updateTransaction)
    //                 Product.findByIdAndUpdate (req.body.productId, {
    //                     stock : productStock
    //                 })
    //             })
    //             .then(updatedTransaction => {
    //                 res.status(201).json({
    //                     updatedTransaction
    //                 })
    //             })
    //         }
    //         else {
    //             res.status(401).json({
    //                 message: "Product is out of stock"
    //             })  
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         if (err.kind === "ObjectId") {
    //             console.log("Product does not exists")
    //             res.status(401).json({
    //                 message: "Product does not exists"
    //             })
    //         }
    //         else {
    //             res.status(500).json({
    //                 message: "Internal server error"
    //             })          
    //         }
    //     })
    // }

    // checkout(req, res) {
    //     Transaction.findById(req.body.transactionId, {
    //     })
    //     .then(foundTransaction => {
    //         if(foundTransaction === null){
    //             message: "Transaction not found"
    //             res.status(401).json({
    //                 message: "Transaction not found"
    //             })
    //         }
    //         else if (foundTransaction.stock > 0) {
    //             const productStock = foundProduct.stock - 1
    //             Product.findByIdAndUpdate (req.body.productId, {
    //                 $pull: {
    //                     cart: req.body.product.id
    //                 }
    //             },
    //             {new: true})
    //             .then (updateTransaction => {
    //                 console.log(updateTransaction)
    //                 Product.findByIdAndUpdate (req.body.productId, {
    //                     stock : productStock
    //                 })
    //             })
    //             .then(updatedTransaction => {
    //                 res.status(201).json({
    //                     updatedTransaction
    //                 })
    //             })
    //         }
    //         else {
    //             res.status(401).json({
    //                 message: "Product is out of stock"
    //             })  
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         if (err.kind === "ObjectId") {
    //             console.log("Product does not exists")
    //             res.status(401).json({
    //                 message: "Product does not exists"
    //             })
    //         }
    //         else {
    //             res.status(500).json({
    //                 message: "Internal server error"
    //             })          
    //         }
    //     })
    // }
    
    checkout(req, res) {
        // Step 1: Find the transaction by its ID
        Transaction.findById(req.body.transactionId)
            .then(foundTransaction => {
                if (!foundTransaction) {
                    return res.status(404).json({
                        message: "Transaction not found"
                    });
                }
    
                // Step 2: Find the product using productId from the request body
                const productId = req.body.productId;
                Product.findById(productId)
                    .then(foundProduct => {
                        if (!foundProduct) {
                            return res.status(404).json({
                                message: "Product not found"
                            });
                        }
    
                        // Step 3: Check if the product is in stock
                        if (foundProduct.stock > 0) {
                            // Step 4: Mark the product as sold
                            Product.findByIdAndUpdate(
                                productId,
                                {
                                    sold: true,  // Mark the product as sold
                                    stock: foundProduct.stock - 1, // Reduce the stock
                                    $pull: {
                                        cart: foundTransaction._id // Remove product from user's cart
                                    }
                                },
                                { new: true }
                            )
                                .then(updatedProduct => {
                                    console.log("Product marked as sold and stock updated:", updatedProduct);
    
                                    // Step 5: Respond with success and updated transaction info
                                    res.status(200).json({
                                        message: "Product marked as sold and stock updated",
                                        updatedProduct,
                                        updatedTransaction: foundTransaction
                                    });
                                })
                                .catch(err => {
                                    console.error("Error updating product status:", err);
                                    res.status(500).json({
                                        message: "Error updating product status"
                                    });
                                });
                        } else {
                            return res.status(400).json({
                                message: "Product is out of stock"
                            });
                        }
                    })
                    .catch(err => {
                        console.error("Error finding product:", err);
                        res.status(500).json({
                            message: "Error finding product"
                        });
                    });
            })
            .catch(err => {
                console.error("Error finding transaction:", err);
                res.status(500).json({
                    message: "Internal server error"
                });
            });
    }    
    
}








