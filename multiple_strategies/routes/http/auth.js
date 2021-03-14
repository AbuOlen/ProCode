const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const passport = require('passport');
const controllers = require('../../controllers/index');

//require('../../controllers/auth/google/__strategy'); 
//require('../../controllers/auth/strategies/local'); 
//const validator = require('../validator');

// Login Form
//router.get('/login', userController.loginForm);

router.get('/', controllers.showHomePage);

router.get('/failed', controllers.showFailedPage);

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', controllers.isLoggedIn, controllers.showWelcomeGoogle)
        
// Auth Routes Google
//router.get('/google', controllers.authGoogle.getLogin);
router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), controllers.redirectToWelcome);

//router.get('/logout', controllers.auth.logout);

//Auth Routes Local
router.post('/local',  upload.none(), controllers.authLocal.getLogin, controllers.authLocal.isAuth);

  
  // router.post('/logout', (req, res) => {
  //   req.logOut();
  //   res.redirect('/');
  // });
  router.get('/logout', function(req, res) {
    //if(req.session.passport){ delete req.session.passport; }
    // req.session.destroy((err) => {
    //   if(err) {
    //     console.log(err);
    //   };
    //   req.logout();
      req.logOut();
      
      //res.json({});
      res.redirect('/') // will always fire after session is destroyed
    })
    //req.logout();
    //res.redirect('/');
//});
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