const express = require('express')
const transactionController = require('../controllers/transactionController')
const verification = require('../middleware/verification')
const router = express.Router()

router.get("/", verification.authenticate, transactionController.get)
router.get("/getOne/:id", transactionController.get)
router.post("/create/:id", verification.authenticate, verification.authorize, transactionController.create);
router.put("/update/:id", verification.authenticate, transactionController.update,)
router.delete("/delete/:id", verification.authenticate, transactionController.delete,)
router.post("/checkout/:id", verification.authenticate, transactionController.checkout)

module.exports = router