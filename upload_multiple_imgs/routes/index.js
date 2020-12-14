var express = require("express");
var router = express.Router();
var multer = require('multer')

const path = require("path");
const fs = require('fs').promises;
const options = {};

const filename1 = 'temp.jpg';
const filepath1 = 'uploads/';

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, filepath1);
    },
    filename: function (req, file, cb) {
        cb(null, filename1);
    }
});
let upload = multer({storage: storage});

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/img/:img', (req,res) => {
    console.log('img.req', req.params.img);
    let path1 = path.join(__dirname, '../uploads/',req.params.img);
    console.log(path1);
    res.sendFile(path1)
})

router.post ('/upload', upload.single('thefile2'), (req,res) => {
    let fname = `${req.body.name + '-' + Date.now()}.jpg`;
    console.log(fname);
    fs.rename(`${filepath1}${filename1}`, `${filepath1}${fname}`)
    .then(() => {
      console.log('renamed')
      res.send(`<img src="/img/${fname}">`);
      res.end();
    });

});

module.exports = router;