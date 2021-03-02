const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userDB = require("../models/users");

// ----- calculate Hash
const crypto = require("crypto");
const secret = "dfhdfh";
const calculateHash = function (passw) {
  return crypto.createHash("sha256", secret).update(passw).digest("hex");
};

passport.serializeUser(function (user, done) {
  console.log("serialize >>>", user), done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("DEserialize >>>", id);
  const user = await userDB.getUser(id);
  done(null, user);                 
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",                   // NOT <input name="username"><input name="password">
      passwordField: "auth",
    },
    async (login, auth, done) => {
      try {
        let user = await userDB.getUserByLogin(login);
        if (user && calculateHash(auth) === user.auth) {
          return done(null, user); // (err, user)
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    }
  )
);
