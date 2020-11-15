var express = require('express');
var router = express.Router();
const axios = require('axios');

const options = {};

/* GET breed image. */
router.get('/:breed', function(req, res) {
  let url  = `https://dog.ceo/api/breed/${req.params.breed}/images/random`;
  axios.get(url)
  .then(function(response) {
       // handle success
       options.img_src = response.data.message;
      res.render('index', options);
  })
  .catch(function (error) {
      // handle error
      console.log(error.code);
    })
  .then(function () {
      // always executed

  });
  
});

module.exports = router;
