const bcrypt = require("bcryptjs");
const User = require("../sequelize/models/user");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    logger.error("Register error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", user, token });
  } catch (error) {
    logger.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      logger.error("Logout error:", err.message);
      return res
        .status(500)
        .json({ message: "Could not log out, please try again" });
    }
    req.session.destroy((err) => {
      if (err) {
        logger.error("Session destruction error:", err.message);
        return res
          .status(500)
          .json({ message: "Could not log out, please try again" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
};
