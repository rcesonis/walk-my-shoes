const bcrypt = require("bcryptjs");
const User = require("../sequelize/models/user");

// Controller function for user registration
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
    console.error("Error occurred during user registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = (req, res) => {
  res.json({ message: "Logged in successfully", user: req.user });
};
