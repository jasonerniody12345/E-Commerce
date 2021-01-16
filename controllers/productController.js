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

getByName (req, res) {
    console.log(req.query.productName)
    Product.findOne(req.query.productName, {
    })
    .then(getName => {
        console.log("Displaying searched item")
        res.status(201).json({
            getName
        })
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
        })
    })

},
    
sortByDescend (req, res) {
    Product.find({   
    }), null, {sort: "price: -price"}
    .then(descend => {
        console.log("Sort price descending order")
        res.status(201).json({
            descend
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
    }).sort("price: ascend")
    .then(ascend => {
        console.log("Displaying ascended price")
        res.status(201).json({
            ascend
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