const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Models = require("../models/schemas/users");

// const formToObj = (o) => {
//   return {
//     name: o.name,
//     surname: o.surname,
//     login: o.login,
//     auth: Models.calculateHash(o.auth),
//   };
// };

module.exports = {
  loginForm: function (req, res) {
    res.render("login");
  },

  createData: function (req, res) {
    let inputData = req.body;
    console.log(req.body);
    
    Users.createData(inputData, function (data) {
      res.send("record was created");
      console.log('===>data', data);
    });
  },

  verifyLogin: async function (req, res) {
    //console.log(req.body);
    //console.log('req.body.login', req.body.login);
    let user = await Models.findUserAuthByLogin(req.body.login);
    let isValid = await Models.verifyPassword(user, req.body.password);
    //console.log('===>req.body.password', req.body.password);
    let resp = {isValid: isValid, message: ""};

    if (isValid) {
      resp.name = user.name;
      resp.surname = user.surname;
    } else {
        resp.message = "Invalid login or password";
    }
    res.send(resp);
  },


//   fetchData: function (req, res) {
//       console.log(req.body);
//     Users.fetchData(function (data) {
//       res.send({ userData: data });  
//     });
//   },

//   findUserNameByLogin: async function (req, res) {
//     const name = await Models.findUserNameByLogin(req.params.login);
//     console.log();
//     res.send(name);
//   },

};
