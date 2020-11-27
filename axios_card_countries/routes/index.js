var express = require("express");
var router = express.Router();
const axios = require("axios");

const options = {};

router.get("/", function (req, res) {
  options.loader_disp = "display: none";
  res.render("index", options);
  options.loader_disp = "";
});

router.get("/:id", function (req, res) {
  options.id = req.params.id;
  let url = `https://restcountries.eu/rest/v2/region/${req.params.id}/`;
  axios
    .get(url)
    .then(function (res1) {
      options.countries = res1.data;
      options.curr_names = res1.data.map(function (country) {
        return country.currencies[0].name;
      });
      options.trans_de = res1.data.map(function (country) {
        return country.translations.de;
      });
      options.trans_es = res1.data.map(function (country) {
        return country.translations.es;
      });
      options.trans_it = res1.data.map(function (country) {
        return country.translations.it;
      });
      options.loader_disp = "display: none";
      res.render("index", options);
      options.loader_disp = "";
    })
    .catch((err) => {
      console.log("axios err", err);
      options.loader_disp = "display: none";
      res.render("index", options);
      options.loader_disp = "";
    });

});

module.exports = router;
