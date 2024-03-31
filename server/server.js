const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require("./config/passport");
const session = require("express-session");
require("dotenv").config();

const userRoutes = require("./routes/api/user");
const postRoutes = require("./routes/api/post");

const errorHandler = require("./middleware/error");

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
app.use(cors());

// Apply rate limit to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// User routes
app.use("/api/users", userRoutes);

// Post routes
app.use("/api/posts", postRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
