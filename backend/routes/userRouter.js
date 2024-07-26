const express = require("express")
const {loginUser, signupUser, changePassword} = require("../controllers/userController")
const router = express.Router()

// Login route
router.post("/login", loginUser)

// Signup route
router.post("/signup", signupUser)

// Change Password
router.patch("/change-password", changePassword)

module.exports = router 