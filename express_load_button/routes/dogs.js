var express = require('express');
var router = express.Router();
const axios = require('axios');

const options = {
    img_src: ""
};

/* GET dog image. */
router.get('/', function(req, res, next) {
  res.render('dogs_index', options);
});

router.get('/load', function(req, res, next) {
    axios.get('https://dog.ceo/api/breeds/image/random')
    .then(function(response) {
         // handle success
         options.img_src = response.data.message;
         res.redirect('/dogs');
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
      })
    .then(function () {
        // always executed

    });
});

module.exports = router;
