var express = require('express');
var router = express.Router();
const axios = require('axios');

const options = {};

router.get('/', function(req, res) {
    options.img_src = '';
    options.img_src_err = 'Choose breed';
    res.render('index', options);
});

/* GET breed image. */
router.get('/:breed', function(req, res) {
  let url  = `https://dog.ceo/api/breed/${req.params.breed}/images/random`;
  axios.get(url)
  .then(function(response) {
       // handle success
    options.img_src = response.data.message;
    options.img_src_err = '';
    res.render('index', options);
  })
  .catch(function (reject) {
      // handle error
    options.img_src_err = reject.response.data.message;
    options.img_src = '';
    res.render('index', options);
    console.log(reject.response.data.message);
    })
});

module.exports = router;
