const express = require("express");

const router = express.Router();

// Login route
router.get("/login", (req, res) => {
  res.send("Login route");
});

// Signup route
router.get("/signup", (req, res) => {
  res.send("Signup route");
});

// Logout route
router.get("/logout", (req, res) => {
  res.send("Logout route");
});

module.exports = router;
