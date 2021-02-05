const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Models = require("../models/schemas/users");

module.exports = {
  loginForm: function (req, res) {
    res.render("login");
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
    } else {
      resp.message = "Invalid login or password";
    }
    res.send(resp);
  },
};
