const LocalStrategy = require("passport-local");
const { emailExists, createUser, matchPassword } = require("./helper");

module.exports = (passport) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // Add this option to pass 'req' to the callback
      },
      async (req, email, password, done) => {
        try {
          const name = req.body.name; // Assuming 'name' is sent in the request body

          const userExists = await emailExists(email);

          if (userExists) {
            return done(null, false);
          }

          const user = await createUser(email, password, name);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await emailExists(email);
          if (!user) return done(null, false);
          const isMatch = await matchPassword(password, user.password);
          if (!isMatch) return done(null, false);
          return done(null, { id: user.id, email: user.email });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
