const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../../controllers/index');
const articleController = require('../../controllers/article');
const validator = require('../validator');

// Login Form
router.get('/login', userController.loginForm);

//Registration Form
router.get('/register', userController.registerForm);

router.post('/register', upload.none(), validator, userController.createData);

router.post('/login', upload.none(), userController.verifyLogin);

router.get('/hello', userController.helloForm);


// Article Form
router.get('/articles', articleController.articleForm);

router.post('/articles/create', upload.none(), articleController.createArticle);

router.get('/articles/:id', articleController.findArticleById);



module.exports = router;