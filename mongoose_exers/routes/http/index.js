const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../../controllers/users');
const validator = require('../../controllers/validator');

router.get('/', userController.userForm);

router.post('/create', upload.none(), userController.createData);

router.get('/list', userController.fetchData);

router.get('/list/parameters/:id', userController.editData);

router.post('/list/parameters/:id', upload.none(), validator, userController.updateData);

router.get('/list/subjects/:id', userController.editData);

router.post('/list/subjects/:id', upload.none(), userController.addData);


   
    module.exports = router;