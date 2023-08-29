const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

//cheking is user already registred or not
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
//register the user
exports.registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  //create the new user
  this.findUserByEmail(userData.email);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: "User",
  });
  return await newUser.save();
};

//verify the password
exports.verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

//verify the email
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
