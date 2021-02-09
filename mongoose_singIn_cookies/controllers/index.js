const express = require("express");
const router = express.Router();

const Users = require('../models/users');
const Models = require('../models/schemas/users');
const Auth = require('../models/auth');

module.exports = {
  loginForm: function (req, res) {
    res.render("login");
  },

  logoutForm: function (req, res) {
    res.clearCookie('token');
    res.clearCookie('expired');
    res.redirect("login");
  },


  registerForm: function (req, res) {
    res.render('register');
  },

  helloForm: function (req, res) {
    console.log(req.get('user-agent'));
    res.render('hello', {name: req.query.name});
  },

  createData: function (req, res) {
    let inputData = req.body;
    Users.createData(inputData, function (data) {
      res.send("record was created");
      console.log("===>data", data);
    });
  },

  verifyLogin: async function (req, res) {
    let user = await Models.findUserAuthByLogin(req.body.login);
    let isValid = await Models.verifyPassword(user, req.body.password);
    let resp = { isValid: isValid, message: "" };

    if (isValid) {
      resp.name = user.name;
      resp.surname = user.surname;
      console.log(Auth);
      Auth.generateUserAuth(req, res, user, (err) => {
        if (err) throw err;
        res.send(resp);
      });
    } else {
      resp.message = "Invalid login or password";
      res.send(resp);
    }

  },
};
