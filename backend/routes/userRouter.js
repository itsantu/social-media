const express = require("express")
const {loginUser, signupUser, changePassword, deleteUser, getOTP, forgotPassword, verifyOtp} = require("../controllers/userController")
const router = express.Router()

// Login route
router.post("/login", loginUser)

// Get OTP route
router.post("/get-otp", getOTP)

// Signup route
router.post("/signup", signupUser)

// Change Password route
router.patch("/change-password", changePassword)

// Check if the otp is verified
router.post("/verify-otp", verifyOtp)

// Forgot Password
router.patch("/forgot-password", forgotPassword);

// Delete user route
router.delete("/delete-user", deleteUser)

module.exports = router 