const Product = require("../models/productModel")

module.exports = {

create (req, res) {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        image: req.body.image
    })
    .then(createItem => {
        console.log("sucessfully registered new item")
        res.status(201).json({
            message: "sucessfully registered new item",
            createItem
        })
    })
    .catch(err => {
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
    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        image: req.body.image
    })
    .then(updateItem => {
        console.log("successfully updated item")
        res.status(201).json({
            message: "sucessfully updated item",
            updateItem
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
    Product.findByIdAndDelete(req.params.id, {
    })
    .then(deleteItem => {
        console.log("succesfully deleted item")
        res.status(201).json({
            message: "sucessfully deleted item",
            deleteItem
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
    Product.find({
    })
    .populate("user")
    .then(getItem => {
        console.log("Displaying all listed item")
        res.status(201).json({
            getItem
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
    Product.findById(req.params.id,{
    })
    .populate("user")
    .then(getItem => {
        console.log("Displaying specific listed item")
        res.status(201).json({
            getItem
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
            })
        })
    },
    
sortByDescend (req, res) {
    Product.find({
    })
    .then(sortItem => {
        sortItem.sort((a,b) => a - b)
        console.log("Displaying descended price")
        res.status(201).json({
            sortItem
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
        })
    })
},

sortByAscend (req, res) {
    Product.find({
    })
    const storage = []
    .then(sortItem => {
        sortItem.sort((a,b) => b - a)
        storage.push(sortItem)
        console.log("Displaying ascended price")
        res.status(201).json({
            sortItem
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