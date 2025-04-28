const express = require('express')
const productController = require('../controllers/productController')
const verification = require('../middleware/verification')
const router = express.Router()
router.get("/", productController.get)
router.get("/getByUserId/:userId", productController.getByUserId);
router.get("/name", productController.getByName)
router.get("/getOne/:id", productController.getOne)
router.get("/sortPrice", productController.sortPrice)
// router.get("/descendPrice", productController.sortByDescend)
// router.get("/ascendPrice", productController.sortByAscend)
router.get("/:id", productController.getOne) //:id selalu harus dibawah dulu
// router.post("/create", verification.authenticate, verification.adminAuthorize, productController.create)
router.post("/create", productController.create)
router.put("/update/:id", productController.update)
router.delete("/delete/:id", productController.delete)
module.exports = router