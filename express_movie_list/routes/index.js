var express = require('express');
var router = express.Router();
const axios = require('axios');

const options = {};

router.get('/', function(req, res) {
  options.name = '';
  options.movie = [];
  res.render('index', options);
});

router.get('/:id', function(req, res) {
  let url  = `https://swapi.dev/api/people/${req.params.id}/`;
  axios.get(url)
  .then(function(res1) {
    options.name = res1.data.name;
    options.movie = res1.data.films;
    console.log(options.movie);
    res.render('index', options);
  })
  .catch ((err) => {
    console.log('axios err', err);
  })
});

module.exports = router;
