const passport = require("passport");
const express = require("express");
const app = express();
require("./passportConfig")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/auth/signup",
  passport.authenticate("local-signup", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
);

app.post(
  "/auth/login",
  passport.authenticate("local-login", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

app.listen(3000, () => console.log("Listening on port 3000"));
