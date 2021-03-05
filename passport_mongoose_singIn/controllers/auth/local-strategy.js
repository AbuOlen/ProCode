const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { ObjectID } = require("mongodb");
const userDB = require("../../models/schemas/users");

// ----- calculate Hash
const crypto = require("crypto");
const secret = "dfhdfh";
const calculateHash = function (passw) {
  return crypto.createHash("sha256", secret).update(passw).digest("hex");
};

passport.serializeUser(function(user, done) {
  console.log('serialize >>>', user),
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('DEserialize >>>', id);
  const user = await userDB.findOne({_id: ObjectID(id)},function(err,user){
    // if(err) {
    //   done(err)
    // } else {
       done(null,user);
    // }
  });
 // done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",                   // NOT <input name="username"><input name="password">
      passwordField: "password",
    },
    async (login, auth, done) => {
      try {
        let user = await userDB.findUserAuthByLogin(login);
        console.log(user);
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