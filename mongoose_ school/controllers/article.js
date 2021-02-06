const express = require("express");
const router = express.Router();


const Articles = require("../models/articles");

const formToObj = (o) => {
  return {
    title: o.title,
    author: o.author,
    text: o.text,
  };
};

module.exports = {

    articleForm: function (req, res) {
        res.render("articles");
      },

  createArticle: function (req, res) {
    let inputData = formToObj(req.body);
    Articles.createArt(inputData, function (data) {
      res.send(" record was created");
    });
  },

};
