const User = require("../models/userModel");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { deleteImage } = require("../utils/cloudinary");
const {
  generateOTP,
  sendOtpEmail,
  saveOTP,
  verifyOTP,
} = require("../utils/varifyEmail.js");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// const getOTP = async (req, res) => {
//   const { email, signUpRequest } = req.body;
//   if (!email) {
//     return res.status(400).json({ error: "Email is required." });
//   }

//   try {
//     if (signUpRequest) {
//       const user = await User.findOne({ email });
//       if (user) {
//         return res.status(302).json({ error: "Email already in use." });
//       }
//     }

//     const otp = generateOTP();
//     if (!otp) {
//       return res.status(500).json({ error: "Problem in generating OTP" });
//     }

//     saveOTP(email, otp);

//     const otpSend = await sendOtpEmail(email, otp);

//     if (!otpSend) {
//       return res.status(500).json({ error: "Failed to send OTP" });
//     }

//     return res.status(201).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

const getOTP = async (req, res) => {
  const { username, email,password, typeOfRequest } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // If it's a sign-up request, check if the user already exists
    if (typeOfRequest == "signUpRequest") {
      const user = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });
      if (user) {
        return res.status(302).json({ error: "Email already in use." });
      }
      if (usernameExists) {
        return res.status(302).json({ error: "Username already in use." });
      }
      if (!validator.isEmail(email)) {
        return res.status(404).json({ error: "Email is not valid." });
      }
      if (!validator.isStrongPassword(password)) {
        return res.status(404).json({ error: "Password is not strong enough." });
      }
    }

    if (typeOfRequest == "loginRequest") {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "No such user found." });
      }
    }

    
    // Generate OTP
    const otp = generateOTP();
    if (!otp) {
      return res.status(500).json({ error: "Failed to generate OTP." });
    }

    // Save OTP to the database or cache
    saveOTP(email, otp);

    // Send OTP email
    const otpSend = await sendOtpEmail(email, otp);
    if (!otpSend) {
      return res.status(500).json({ error: "Failed to send OTP email." });
    }

    // OTP successfully sent
    return res.status(201).json({ message: "OTP sent successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error." });
  }
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

const loginUserViaOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!verifyOTP(email, otp)) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect email" });
    }
    const token = createToken(user._id);
    const uname = user.username;
    res.status(201).json({ uname, email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// SignUp user
const signupUser = async (req, res) => {
  const { username, email, password, OTP } = req.body;
  console.log(username, email, password, OTP);
  if (!verifyOTP(email, OTP)) {
    console.log(email, OTP);
    return res.status(400).json({ error: "Invalid OTP" });
  } else {
    try {
      const user = await User.signup(username, email, password); // .signup() function initialized in userModel

      // create a token
      const token = createToken(user._id);
      const uname = user.username;
      res.status(201).json({ uname, email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};



//Change password of the User
const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.changepassword(email, currentPassword, newPassword); // .changepassword() function initialized in userModel

    res.status(200).json({ success: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete the User and their Posts permanently
const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  if (!user) {
    return res.status(400).json({ error: "User not found" });
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

const verifyOtp = async (req, res) => {
  const { email, OTP } = req.body;

  if (!email || !OTP) {
    return res.status(400).status({ error: "All fields are required "})
  }

  const isValidOtp = verifyOTP(email, OTP);  // Check OTP validity

  if (isValidOtp) {
    return res.status(200).json({ verified: true });
  } else {
    return res.status(400).json({ error: "Invalid OTP", verified: false });
  }
}

const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    await User.updateOne({ email }, { password: hash });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Error occured" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  changePassword,
  deleteUser,
  getOTP,
  forgotPassword,
  verifyOtp
};
