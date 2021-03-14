const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const { ObjectID } = require("mongodb");
const Model = require("../../../models/Users");

passport.serializeUser(function (user, done) {
  console.log("serialize >>>", user),
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  console.log("DEserialize >>>", id);
  if (id.id == "undefined") {              // check if id is user{} or user.id
    const user = await Model.findById(id);
    done(null, user);
  } else {
    done(null, id);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",                   // NOT <input name="username"><input name="password">
      passwordField: "password",
    },
    async (login, auth, done) => {
      try {
        let user = await Model.getUserByLogin(login);
        if (user && Model.calculateHash(auth) === user.auth) {
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

module.exports = {};
