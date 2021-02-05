const path = require("path");
const mongoose = require("mongoose");
const model = require("../models/schemas/users");
const { ObjectId } = require('mongodb');
const Models = require("./schemas/users");

const formToObj = (o) => {
  return {
    name: o.name,
    surname: o.surname,
    login: o.login,
    password: o.auth,
  };
};

module.exports = {
  


 // create new data 
  createData: function (inputData, callback) {
    userData = new model(formToObj(inputData));
    userData.save(function (err, data) {
      if (err) throw err;
      return callback(userData);
    });
  },



};

