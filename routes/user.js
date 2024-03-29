const express = require('express')
const userController = require('../controllers/userController')
const verification = require('../middleware/verification')
const router = express.Router()

router.get("/", verification.authenticate, verification.adminAuthorize, userController.get)
router.get("/getOne/:id", verification.authenticate, verification.authorize, userController.getOne)
router.post("/login", userController.login)
router.post("/register", userController.register)
router.put("/addToCart/:id", verification.authenticate, verification.authorize,  userController.AddToCart)
router.put("/removeFromCart/:id", verification.authenticate, verification.authorize,  userController.AddToCart)
router.put("/update/:id", verification.authenticate, verification.authorize, userController.update)
router.delete("/delete/:id", verification.authenticate, verification.authorize, userController.delete)
router.post("/verifyToken", userController.verify)

module.exports = router