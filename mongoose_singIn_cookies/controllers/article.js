const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');
const Articles = require("../models/articles");
const Users = require('../models/users');


module.exports = {

  articleForm: function (req, res) {
      res.render("articles");
  },


  createArticle: function (req, res) {
    let expire = req.cookies['expired'];
    let expDate = new Date(expire).getTime();
    console.log('expire date========', expDate);
    console.log('date now===========', Date.now());
    if(Date.now() > expDate) {
      res.send({isValid: false});
      return;
    }
    Articles.createArt(req, res, function (data) {
      res.send({isValid: true, message: "record was created"});
    });
  },

  findArticleById: async function (req, res) {
    await Articles.find({ author: ObjectId(req.params.id)} )
      .populate('author', 'surname')
      .then((r) => {
        console.log(r);
        res.send(r);
      });
  },

};
