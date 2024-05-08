const dotenv = require("dotenv");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
dotenv.config();

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Create the user if email is not already in use
    const userId = await User.create(username, email, password);

    const payload = { userId: userId, username: username };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    res.cookie("token", token);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(";login etthiii server sideeee");
  try {
    const user = await User.findByEmail(email);
    const payload = { userId: user.id, username: user.username };
   
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token",token);
    return res.status(200).json({ message: "User login successfully" });

    // res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.logOut = async (req, res) => {
  console.log("logOouttt");
  try {
    // Clear the HTTP-only cookie containing the JWT token
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
