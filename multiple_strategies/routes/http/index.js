var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
//const passport = require('passport');
const validator = require('../validator');
const controllers = require('../../controllers/index');


router.get('/', controllers.showHomePage);

//Registration Form
router.get('/register', (req, res) => {
    res.render('register');
  });

router.post('/register', upload.none(), validator, controllers.createData);





module.exports = router;
