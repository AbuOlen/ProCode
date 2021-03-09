var express = require('express');
var router = express.Router();

const passport = require('passport');

const controllers = require('../controllers/index');
    
require('../controllers/strategies/google'); 
require('../controllers/strategies/facebook'); 

// Example protected and unprotected routes
router.get('/', controllers.showHomePage);

router.get('/failed', controllers.showFailedPage);

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', controllers.isLoggedIn, controllers.showWelcomePage)
        
// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), controllers.redirectToWelcome);


router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failed' }), controllers.showHomePage);

router.get('/profile',require('connect-ensure-login').ensureLoggedIn(), controllers.viewProfileFacebook);

router.get('/logout', controllers.logout);

module.exports = router;
