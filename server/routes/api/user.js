const express = require("express");
const passport = require("passport");

const userController = require("../../controllers/userController");

const router = express.Router();

// Register route
router.post("/register", userController.register);

// Login route
router.post("/login", passport.authenticate("local"), userController.login);
module.exports = router;
