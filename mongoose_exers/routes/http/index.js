const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../../controllers/users');


router.get('/', userController.userForm);

router.post('/create', upload.none(), userController.createData);

router.get('/list', userController.fetchData);

router.get('/list/parameters/:id', userController.editData);

router.post('/list/parameters/:id', upload.none(), userController.updateData);


//router.get('/list/:sid/:id', userController.editData);
//router.post('/list/:sid/:id', userController.updateData);


   
    module.exports = router;