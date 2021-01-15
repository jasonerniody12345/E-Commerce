const express = require('express')
const productController = require('../controllers/productController')
const verification = require('../middleware/verification')
const router = express.Router()

router.get("/", productController.get)
router.get("/:id", productController.getOne)
router.get("/ascendPrice", productController.sortByAscend)
router.get("/descendPrice", productController.sortByDescend)
router.post("/create", productController.create)
router.put("/update/:id", verification.authenticate, verification.adminAuthorize, productController.update)
router.delete("/delete/:id", verification.authenticate, verification.adminAuthorize, productController.delete)

module.exports = router