var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer();

const axios = require("axios");

const options = {};

router.get("/", function (req, res) {
  options.name = "";
  options.movie = [];
  res.render("index", options);
});

// gets character info by id
const id_character = async (url) => {
  return await axios.get(url).then(function (res2) {
    options.name = res2.data.name;
    options.movieArr = res2.data.films;
  });
};

// gets movie info by id
const id_movie = async (url) => {
  return await axios.get(url).then(function (res1) {
    options.title_movie = res1.data.title;
  });
};

router.post("/api", upload.none(), (req, res) => {
  // build character info URL
  options.id = req.body.id_character;
  let url_id_character = `https://swapi.dev/api/people/${req.body.id_character}/`;

  // build movie info URL
  options.movie = req.body.id_movie;
  let url_id_movie = `https://swapi.dev/api/films/${req.body.id_movie}/`;

  // wait for responces
  Promise.all([id_character(url_id_character), id_movie(url_id_movie)])
    .then((r) => {
      // get movie ids from movie URLs
      let movie_ids = options.movieArr.map(function (movie_url) {
        const substr = movie_url.split("/");
        return substr[substr.length - 2];
      });
      
      // check whether movie ids array contains the movie id 
      if (movie_ids.includes(options.movie.toString())) {
        res.send(options.name + " filmed in " + options.title_movie);
      } else {
        res.send(options.name + " not filmed in " + options.title_movie);
      }
      res.end();
    })
    .catch((err) => {
      console.log("promise all err", err);
      res.send(err);
      res.end();
    });
});

module.exports = router;
