const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error("All fiels must be filled");
  }
  // if (!validator.isEmail(email)) {
  //   throw Error("Email is not valid!");
  // }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password is not Strong enough");
  // }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error("Username already exists");
  }
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fiels must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

// Static Change Password method
userSchema.statics.changepassword = async function (email, currentPassword, newPassword) {
  
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User not found")
  }

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error("Password is not Strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  const newuser = await this.findByIdAndUpdate(
    user._id,
    { password: hash },
    { new: true }
  );

  return newuser
};

const User = mongoose.model("User", userSchema);

module.exports = User;
