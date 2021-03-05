const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../../controllers/index');
const validator = require('../validator');
//const authenticator = require('../authenticator');

const passport = require('passport');
require('../../controllers/auth/local-strategy');

// Login Form
router.get('/', userController.loginForm);

//Registration Form
router.get('/register', userController.registerForm);

router.post('/register', upload.none(), validator, userController.createData);

//router.post('/login', upload.none(), userController.verifyLogin);

//router.get('/hello', userController.helloForm);


//-------------------------
/* GET users listing. */
// router.get('/', (req, res) => {
//     console.log('route / req session >>> ', req.session);
//     res.send('base page');
//   });
  
  
router.post('/',  upload.none(), (req, res, next) => {
    passport.authenticate('local', function(err, user) {
      if (err) { return next(err); }
      if (!user) { return res.send({isValid: false, message: 'incorrect login or password!'}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({ isValid: true, name: user.name, userid: user._id });
        //return res.redirect('/hello');
      });
    })(req, res, next);
  });
  
  const auth = (req, res, next) => {
    if (req.isAuthenticated()) {               
      next();
    } else {
      console.log('Not authenticated');
      return res.redirect('/');
    }
  };
  
  router.get('/hello', auth, userController.helloForm, (req, res) => {
    console.log('hello page');
  });
  
  router.get('/logout', auth, userController.logoutForm, (req, res) => {
    req.logOut();
    res.redirect('/');
  });
//-----------------

//router.get('/logout', userController.logoutForm);

module.exports = router;