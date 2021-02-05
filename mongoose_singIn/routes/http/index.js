const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../../controllers/index');
const validator = require('../validator');

// Login Form
router.get('/login', userController.loginForm);

//Registration Form
router.get('/register', (req, res) => {
    res.render('register');
  });

router.post('/register', upload.none(), validator, userController.createData);

router.post('/login', upload.none(), userController.verifyLogin);

router.get('/hello', (req, res) => {
    res.render('hello', {name: req.query.name});
});


module.exports = router;