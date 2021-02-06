const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../../controllers/users');
const articleController = require('../../controllers/article');
const validator = require('../validator');

router.get('/', userController.userForm);

router.post('/create', upload.none(), userController.createData);

router.get('/list', userController.fetchData);

router.get('/list/parameters/:id', userController.editData);

router.post('/list/parameters/:id', upload.none(), validator, userController.updateData);

router.get('/list/subjects/:id', userController.editData);

router.post('/list/subjects/:id', upload.none(), userController.addData);

//router.get('/:id', userController.findAllUsersFromCityById);

router.get('/articles', articleController.articleForm);

router.post('/articles/create', upload.none(), articleController.createArticle);
  
    module.exports = router;