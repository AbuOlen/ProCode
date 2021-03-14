const Users = require("../models/Users/index");
const authLocal = require("./auth/local");
const authGoogle = require("./auth/google");

module.exports = {
  authLocal,
  authGoogle,

  createData: function (req, res) {
    let inputData = req.body;
    Users.createData(inputData, function (data) {
      res.send("record was created");
      console.log("===>data", data);
    });
  },
  showHomePage: function (req, res) {
   
    res.render("login");
},
  showFailedPage: function (req, res) {
    res.send("You Failed to log in!");
  },
  isLoggedIn: function (req, res, next) {
    // Auth middleware that checks if the user is logged in
    if (req.isAuthenticated()) {
      next();
    } else {
      res.sendStatus(401);
    }
  },
  //-----Google-----
  showWelcomeGoogle: function (req, res) {
    res.send(`Welcome mr/s ${req.user.displayName}!`);
  },
  redirectToWelcome: function (req, res) {
    console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect("/auth/good");
  },
};
