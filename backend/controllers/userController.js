const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    try {
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
        username,
        password: hashedPassword,
        });

        res.status(201).json({
           id: user._id,
           username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
 
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
 
        return res.status(200).json({
            id: user._id,
            username: user.username,
            token,
            message: "Login successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
 };

 const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 };

 const userProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    userProfile,
};