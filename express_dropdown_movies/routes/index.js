var express = require("express");
var router = express.Router();
const axios = require("axios");

const options = {};

router.get("/", function (req, res) {
  axios
    .get("https://swapi.dev/api/films/")
    .then(function (res1) {
      options.results = res1.data.results;
      options.loader = false;
      res.render("index", options);
    })
    .catch((err) => {
      console.log("axios err", err);
    });
});


router.get("/:id", function (req, res) {
  let chars = options.results[Number(req.params.id)].characters;
  const characters = chars.map((el) => {
    return axios.get(el).catch((err) => {
      console.log("axios err", err);
    });
  });

  Promise.all(characters)
    .then((res3) => {
      let names = res3.map((n) => {
        return n.data.name;
      });
      options.names = names;
      options.loader = false;
      console.table(names);

      res.render("index", options);
    })
    .catch((err) => {
      console.log("promise err", err);
    });
});

module.exports = router;
