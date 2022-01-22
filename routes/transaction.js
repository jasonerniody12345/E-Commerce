const express = require('express')
const transactionController = require('../controllers/transactionController')
const verification = require('../middleware/verification')
const router = express.Router()

router.get("/", transactionController.get)
router.get("/getOne/:id", transactionController.get)
router.post("/create", transactionController.get)
router.put("/update/:id", transactionController.get)
router.delete("/delete/:id", transactionController.get)
router.delete("/checkout/:id", transactionController.get)
module.exports = router