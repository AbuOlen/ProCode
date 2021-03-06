var express = require('express');
var router = express.Router();

const passport = require('passport');

     // Auth middleware that checks if the user is logged in
     const isLoggedIn = (req, res, next) => {
      if (req.user) {
          next();
      } else {
          res.sendStatus(401);
      }
  };

// Example protected and unprotected routes
router.get('/', (req, res) => res.send('Example Home page!'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logOut();
    res.redirect('/');
})

module.exports = router;
