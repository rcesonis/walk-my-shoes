const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const userRoutes = require("./routes/api/user");

const app = express();
app.use(cors());
app.use(express.json());

// Use express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// User routes
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
