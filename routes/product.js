const express = require('express')
const productController = require('../controllers/productController')
const verification = require('../middleware/verification')
const router = express.Router()

router.get("/", productController.get)
router.get("/name", productController.getByName)
router.get("/sortPrice", productController.sortPrice)
// router.get("/descendPrice", productController.sortByDescend)
// router.get("/ascendPrice", productController.sortByAscend)
router.get("/:id", productController.getOne) //:id selalu harus dibawah dulu 
router.post("/create", verification.authenticate, verification.adminAuthorize, productController.create)
router.put("/update/:id", verification.authenticate, verification.adminAuthorize, productController.update)
router.delete("/delete/:id", verification.authenticate, verification.adminAuthorize, productController.delete)
module.exports = router