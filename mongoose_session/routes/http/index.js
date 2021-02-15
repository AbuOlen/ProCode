const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const authController = require('../../controllers/index')

router.get('/', authController.helloForm);

router.get('/info/', authController.getVisitorById);

module.exports = router;