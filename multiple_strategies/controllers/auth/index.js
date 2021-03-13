const passport = require('passport');
const localStrategy = require('./strategies/local');

const getLogin = (req, res, next) => { 
    console.log('>>> getLogin');
    passport.authenticate('local', function(err, user) {
        let resp = { isValid: false, message: "" };
      if (err) { return next(err); }
      if (!user) { 
        resp.message =  'incorrect email or password!'; 
          res.send(resp);
        }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        resp.isValid = true;
        resp.name = user.name;
        resp.surname = user.surname;
        res.send(resp);
      });
    })(req, res, next);
  };
const isAuth = (req, res, next) => {
    console.log('>>> isAuth');
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.redirect('/');
    }
  }
  
  const getLogout = (req, res) => {
    console.log('>>> getLogout');
    req.logOut();
    res.redirect('/');
  };
  
  
  module.exports = {
    getLogin,
    getLogout,
    isAuth,
    strategy: {
      local: localStrategy,
    }
  }