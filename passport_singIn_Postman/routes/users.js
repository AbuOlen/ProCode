var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();
const passport = require('passport')


require('../controllers/users');

/* GET users listing. */
router.get('/', (req, res) => {
  console.log('route / req session >>> ', req.session);
  res.send('base page');
});

router.post('/login',  upload.none(), (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.send('incorrect email or password!'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/admin');
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {               // ? 
    next();
  } else {
    console.log('Not authenticated');
    return res.redirect('/');
  }
}

router.get('/admin', auth, (req, res) => {
  res.send('admin page');
})

router.post('/logout', auth, (req, res) => {
  req.logOut();
  res.redirect('/');
})

module.exports = router;
