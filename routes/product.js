const express = require('express')
const productController = require('../controllers/productController')
const verification = require('../middleware/verification')
const router = express.Router()

router.get("/", productController.get)
router.get("/name", productController.getByName)
router.get("/ascendPrice", productController.sortByAscend)
router.get("/descendPrice", productController.sortByDescend)
router.get("/:id", productController.getOne)
router.post("/create", verification.authenticate, verification.adminAuthorize, productController.create)
router.put("/update/:id", verification.authenticate, verification.adminAuthorize, productController.update)
router.delete("/delete/:id", verification.authenticate, verification.adminAuthorize, productController.delete)

module.exports = router