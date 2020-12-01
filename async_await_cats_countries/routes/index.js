var express = require("express");
var router = express.Router();
const request = require("request");
const axios = require("axios");

const options = {};
let countries = [];
let cat_url_dict = {};

const url_cats = "https://api.thecatapi.com/v1/breeds";
const get_cats = new Promise(function (resolve, reject) {
  request(url_cats, function (e, r, body) {
    if (e) {
      reject(e);
    } else {
      let cats = JSON.parse(body).map(function (cat) {
        let c = {};
        c.name = cat.name;
        c.country = cat.origin;
        c.country_code = cat.country_code;
        c.id = cat.id;
        return c;
      });
      resolve(cats);
    }
  });
});

const get_img_url = (url) => {
  return new Promise(function (resolve, reject) {
    request(url, function (e, r, body) {
      if (e) {
        reject(e);
      } else {
        let urls = JSON.parse(body);
        cat_url_dict[`${urls[0].breeds[0].id}`] = urls[0].url;
        resolve(urls[0].url);
      }
    });
  });
};

router.get("/", function (req, res) {
  options.loader_disp = "display: none";
  res.render("index", options);
  options.loader_disp = "";
});

router.get("/:id", function (req, res) {
  options.id = req.params.id;
  let url = `https://restcountries.eu/rest/v2/region/${req.params.id}/`;
  const get_countries = axios
    .get(url)
    .then(function (res1) {
      countries = res1.data.map(function (country) {
        let c = {};
        c.name = country.name;
        c.country_code = country.alpha2Code;
        c.flag = country.flag;
        return c;
      });
    })
    .catch((err) => {
      console.log("axios err", err);
    });

  Promise.all([get_countries, get_cats]).then((r) => {
    options.countries = [];
    let urls = [];
    countries.forEach((country) => {
      const cats = r[1];
      let c = cats.filter((cat) => {
        return cat.country_code === country.country_code;
      });

      if (c.length) {
        let card = {};
        card.name = country.name;
        card.flag = country.flag;
        card.cats = c;

        card.cats.forEach((cat) => {
          let url_img_cat = `https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`;
          urls.push(get_img_url(url_img_cat));
        });

        options.countries.push(card);
      }
    });

    Promise.all(urls).then((r) => {
      options.countries.forEach((card) => {
        card.cats.forEach((cat) => {
          cat.img_url = cat_url_dict[cat.id];
        });
        console.table(card.cats);
      });
      options.loader_disp = "display: none";
      res.render("index", options);
      options.loader_disp = "";
    })
    .catch(error => { 
      console.error(error.message)
    });

  })
  .catch((err) => {
    console.log("Promise all err", err);
  });
});

module.exports = router;
