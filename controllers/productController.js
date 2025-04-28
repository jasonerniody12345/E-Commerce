const { QueryCursor } = require("mongoose");
const Product = require("../models/productModel");
const multer = require('multer');
const path = require('path');
const fs = require("fs");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Ensure unique filenames
  },
});

const upload = multer({ storage }).single('image'); // Handle single file upload

module.exports = {

  create (req, res) {
      Product.create({
          user_id: req.body.user_id,
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          specification: req.body.specification,
          location: req.body.location,
          stock: req.body.stock,
          image: req.body.image,
          sold: req.body.sold
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
              console.log(req.body);
              res.status(500).json({
                  message: "Internal server error"
              })
          }
      })
  },

  update (req, res) {
      Product.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          price: req.body.price,
          location: req.body.location,
          description: req.body.description,
          specification: req.body.specification,
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
              allProduct: getItem
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

  getByUserId(req, res) {
      const userId = req.params.userId;  // Get userId from request params
      Product.find({ user_id: userId })  // Make sure it matches the field in your model
          .then(userProducts => {
              console.log("Displaying products for user ID:", userId);
              res.status(200).json({
                  userProducts  // Return the filtered list of products
              });
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  message: "Internal server error"
              });
          });
  },
      
  getByName (req, res) {
      // console.log(req.query.name)
      // Product.find({name: req.query.name})
      // Product.findOne({"name" : {$regex: /jordan/, $options: 'i'}})
      Product.find({"name" : {$regex: req.query.name, $options: 'i'}})
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

  sortPrice (req, res) {
      var order = "0"
      if (req.query.order === "ascend") {
          order = 1
      } 
      else if (req.query.order === "descend") {
          order = -1
      }
      else{
          console.log("Please input the sorting request")
          res.status(400).json({
              message: "Please input the sorting request"
          })
      }
      Product.aggregate([
          {$sort: {price: order}}
      ])
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
  },

     // sortByAscend (req, res) {
  //     Product.aggregate([
  //             {$sort: {price: 1}}
  //         ])
  //     .then(descend => {
  //         console.log(descend)
  //         console.log("Sort price ascending order")
  //         res.status(201).json({
  //             ascend
  //         })
  //     })
  //     .catch(err => {
  //         console.log(err)
  //         res.status(500).json({
  //             message: "Internal server error"
  //         })
  //     })
  // },
  
  // sortByDescend (req, res) {
  //     Product.aggregate([
  //             {$sort: {price: -1}}
  //         ])
  //     .then(descend => {
  //         console.log(descend)
  //         console.log("Sort price descending order")
  //         res.status(201).json({
  //             descend
  //         })
  //     })
  //     .catch(err => {
  //         console.log(err)
  //         res.status(500).json({
  //             message: "Internal server error"
  //         })
  //     })
  // },


}
