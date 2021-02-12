const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const Articles = require("../models/articles");


module.exports = {
  articleForm: function (req, res) {
    res.render("articles");
  },

  createArticle: function (req, res) {
    Articles.createArt(req, res, function (data) {
      res.send({ isValid: true, message: "record was created" });
    });
  },

  findArticleById: async function (req, res) {
    await Articles.find({ author: ObjectId(req.params.id) })
      .populate("author", "surname")
      .then((r) => {
        console.log(r);
        res.send(r);
      });
  },
};
