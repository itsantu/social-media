const User = require("../models/userModel");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import {generateOTP, sendOtpEmail, saveOTP, verifyOTP} from "../utils/varifyEmail";
const { deleteImage } = require("../utils/cloudinary");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password); // .login() function initialized in userModel

    // create a token
    const token = createToken(user._id);
    const uname = user.username;
    res.status(201).json({ uname, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// to generate otps and send to emails to varify for signup
const getOtpForSignup = async (req, res) => {
    const {email, userName}= req.body;
    if(!email || !userName){
      return res.status(400).json({message: "Email is required"})
    }
    try {
      const user = await User.findOne({ email });
      if(user){
        return res.status(302).json({message:"user already exist with this email!!"})
      }


    const otp = generateOTP();
    if(!otp){
      return res.status(500).json({message:"problem in generating otp"})
    }

    saveOTP(userName, otp)

    const otpSend = sendOtpEmail(email, otp)


      if(!otpSend) return res.status(503).json({message:"some problem occured during sending otp"})

      return res.status(201).json({message:"OTP send successfully for signup"});
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

// SignUp user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);   // .signup() function initialized in userModel

    // create a token
    const token = createToken(user._id);
    const uname = user.username;
    res.status(201).json({ uname, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Change password of the User
const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.changepassword(email, currentPassword, newPassword);   // .changepassword() function initialized in userModel

    res.status(200).json({ success: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete the User and their Posts permanently
const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({error: "Incorrect Password"})
  }
  
  if (!user) {
    return res.status(400).json({error: "User not found"})
  }

  try {
    // Delete user from User model
    const deletedUser = await User.findOneAndDelete({ email });

    // Make an Array of posts made by the deleted user
    const posts = await Post.find({ createdBy: deletedUser._id });

    // Delete every image from Cloudinary server
    for (const post of posts) {
      if (post.imageUrl) {
        await deleteImage(post.imageUrl);
      }
    }

    // Delete the posts from the Post Model
    const result = await Post.deleteMany({ createdBy: user._id });

    res.status(200).json({ success: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to let you go!", error });
  }
};

module.exports = { loginUser, signupUser, changePassword, deleteUser };
