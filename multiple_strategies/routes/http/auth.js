const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const passport = require('passport');
const controllers = require('../../controllers/index');

require('../../controllers/auth/strategies/google'); 
//require('../../controllers/auth/strategies/local'); 
const validator = require('../validator');

// Login Form
//router.get('/login', userController.loginForm);

router.get('/', controllers.showHomePage);

router.get('/failed', controllers.showFailedPage);

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', controllers.isLoggedIn, controllers.showWelcomeGoogle)
        
// Auth Routes Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), controllers.redirectToWelcome);

//router.get('/logout', controllers.auth.logout);

//Auth Routes Local
router.post('/local',  upload.none(), controllers.auth.getLogin, controllers.auth.isAuth);
// (req, res, next) => {
//     passport.authenticate('local', function(err, user) {
//         let resp = { isValid: false, message: "" };
//       if (err) { return next(err); }
//       if (!user) { 
//         resp.message =  'incorrect email or password!'; 
//           res.send(resp);
//         }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         resp.isValid = true;
//         resp.name = user.name;
//         resp.surname = user.surname;
//         res.send(resp);
//       });
//     })(req, res, next);
//   });
//   const auth = (req, res, next) => {
//     if (req.isAuthenticated()) {               // ? 
//       next();
//     } else {
//       console.log('Not authenticated');
//       return res.redirect('/');
//     }
//   };
//   router.get('/admin', auth, (req, res) => {
//     res.send('admin page');
//   });
  
  router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
  });

//Registration Form
// router.get('/register', (req, res) => {
//     res.render('register');
//   });

// router.post('/register', upload.none(), validator, controllers.createData);

//router.post('/login', upload.none(), controllers.verifyLogin);

router.get('/hello', (req, res) => {
    res.render('hello', {name: req.query.name});
});


module.exports = router;