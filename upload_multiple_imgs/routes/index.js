var express = require("express");
var router = express.Router();
var multer = require('multer')

const path = require("path");
const fs = require('fs').promises;
const options = {};


let storage = multer.diskStorage({
    destination: function(req, file, cb) {    // uploading directory 
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {    //unique name with extension
      let str = file.originalname;
      let dotIndex = str.lastIndexOf('.');
      file.filename = `${str.slice(0,dotIndex)}-${Date.now()}.${str.slice(dotIndex+1)}`;
      cb(null, file.filename);    //return renamed file
    }
});

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/img/:id', (req,res) => {
    console.log('img.req', req.params.id);
    let pathAbs = path.join(__dirname, '../uploads/',req.params.id);
    console.log("pathAbs", pathAbs);
    res.sendFile(pathAbs)
});

let uploadStorage = multer({storage: storage});

router.post ('/upload', uploadStorage.array('multiple_images', 10), (req,res) => {
  res.send(req.files.map(el => el.filename));
  res.end();

});



module.exports = router;