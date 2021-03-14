const passport = require('passport');
const googleStrategy = require('./strategy');

const getLogin = (req, res, next) => {
   
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)
    };


  module.exports = {
    getLogin,
    strategy: {
        google: googleStrategy,
    }
  }