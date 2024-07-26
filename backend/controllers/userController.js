const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    const uname = user.username;
    res.status(201).json({ uname, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SignUp user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    // create a token
    const token = createToken(user._id);
    const uname = user.username;
    res.status(201).json({ uname, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.changepassword(email, currentPassword, newPassword)

    res.status(200).json({success: "Password updated successfully"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { loginUser, signupUser, changePassword };
