var express = require("express");
var router = express.Router();
const request = require("request");
const axios = require("axios");

const options = {};
let countries = [];
let cat_url_dict = {};

const url_cats = "https://api.thecatapi.com/v1/breeds";
const get_cats = async () => {
  return await axios
    .get(url_cats)
    .then((r) => {
    let cats = r.data.map(function (cat) {
      let c = {};
      c.name = cat.name;
      c.country = cat.origin;
      c.country_code = cat.country_code;
      c.id = cat.id;
      return c;
    });
    return cats;
  });
};

const get_img_url = async (url) => {
  return await axios
    .get(url)
    .then((r) => {
      let urls = r.data;
      cat_url_dict[`${urls[0].breeds[0].id}`] = urls[0].url;
      return urls[0].url;
    })
    .catch((err) => {
      console.log("axios err", err);
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
      // filter countries by region
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
  //wait till countries and cats are loaded
  Promise.all([get_countries, get_cats()])
    .then((r) => {
      options.countries = [];
      let urls = [];
      //find cats who originated from selected region
      countries.forEach((country) => {
        const cats = r[1];
        let c = cats.filter((cat) => {
          return cat.country_code === country.country_code;
        });

        if (c.length) {
          //create country card
          let card = {};
          card.name = country.name;
          card.flag = country.flag;
          card.cats = c;

          card.cats.forEach((cat) => {
            // get url for cat
            let url_img_cat = `https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`;
            urls.push(get_img_url(url_img_cat));
          });

          options.countries.push(card);
        }
      });

      Promise.all(urls)
        .then((r) => {
          //set img url to every cat
          options.countries.forEach((card) => {
            card.cats.forEach((cat) => {
              cat.img_url = cat_url_dict[cat.id];
            });
            console.table(card.cats);
          });
          //display the page
          options.loader_disp = "display: none";
          res.render("index", options);
          options.loader_disp = "";
        })
        .catch((error) => {
          console.error(error.message);
        });
    })
    .catch((err) => {
      console.log("Promise all err", err);
    });
});

module.exports = router;
