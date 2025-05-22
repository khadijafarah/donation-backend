const express = require('express')
const router = express.Router()
const userController = require ("../controllers/userController")

router.post("/signup" , userController.signup)
router.post("/signin" , userController.signin)
router.get("/all-user" , userController.getAllUser)
router.get("/all-user/:id" , userController.getSingleUserById)





module.exports = router