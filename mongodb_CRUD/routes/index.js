var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const  { getAllData, getItem, appendData, updateData, deleteData } = require('../models/crud');


const formToObj = (o) => {
  return {
      title: o.title,
      author: {
          fullname: o['authorSimple'],
          tel: o['telSimple'].split(',').map(el => el.trim()),
          email: o['emailSimple'].split(',').map(el => el.trim()),
      },
      text:o.text,
      tags: o.tags.split(',').map(el => Number(el)),
  }
};

/* GET home page. */
router.get('/', (req, res, next) => {
  getAllData().then((r) => {
    console.log('==> getAllData', r);
    res.render('index', { arr: r });
  });
});

//Redirect to form
router.get('/:id', (req, res) => {
  getItem(req.params.id)
  .then((r) => {
    console.log('==> getItem', r);
    res.render('form', { el: r });
  });
});

router.post('/', upload.none(), (req, res) => {
  if(req.body.id) {
    console.log('++++++update+++++++');
    updateData(req.body.id, formToObj(req.body));
    //res.redirect('../');
  } else {
  appendData(formToObj(req.body));
  }
  res.redirect('/');
});

router.delete('/:id', upload.none(), (req, res) => {
  console.log('params.id',req.params.id);
  deleteData(req.params.id);
 });
 

module.exports = router;
