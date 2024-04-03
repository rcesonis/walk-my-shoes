const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const userRoutes = require("./routes/api/user");
const postRoutes = require("./routes/api/post");

const ensureAuthenticated = require("./middleware/auth");
const errorHandler = require("./middleware/error");

const app = express();
app.use(helmet());
app.use(cors());

// Use express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

// Apply rate limit to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// User routes
app.use("/api/user", userRoutes);

// Post routes
app.use("/api/post", postRoutes);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/api/users/login?error=authFailed",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/auth/protected", isLoggedIn, (req, res) => {
  let user = req.user.dataValues.name;
  res.json({ message: `Welcome ${user}! You are authenticated`, name: user });
});

// Logout route
// app.get("/api/user/logout", userRoutes.logout);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
