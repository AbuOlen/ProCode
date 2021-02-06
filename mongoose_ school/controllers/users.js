const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const modelUser = require("../models/schemas/users");

const crypto = require("crypto");
const secret = "dfhdfh";

const formParameters = (o) => {
  return {
    height: parseInt(o.height),
    weight: parseInt(o.weight),
    fill_date: Date(o.filltime),
  };
};

const formSubjects = (o) => {
  return {
    mark: parseInt(o.mark),
    fill_date: Date(o.filltime),
  };
};

const formToObj = (o) => {
  return {
    name: o.name,
    surname: o.surname,
    login: o.login,
    auth: crypto.createHash("sha256", secret).update(o.auth).digest("hex"),
    email: o.email,
    phone: o.phone,
    birthday: Date(o.birthday),
    sex: o.sex,
    parameters: formParameters(o),
    subjects: {
      mathematics: [
        {
          mark: parseInt(o.math),
          fill_date: Date(o.filltime),
        },
      ],
      literature: [
        {
          mark: parseInt(o.literature),
          fill_date: Date(o.filltime),
        },
      ],
    },
    address: {
      zip: parseInt(o.zip),
      country: o.country,
      city: o.city,
      street: o.street,
      bilding: o.bilding,
      apartment: o.apartment,
    },
  };
};

module.exports = {
  userForm: function (req, res) {
    res.render("index");
  },
  createData: function (req, res) {
    let inputData = formToObj(req.body);
    console.log(req.body);
    console.log(inputData);
    Users.createData(inputData, function (data) {
      res.send(" record was created");
    });
  },
  fetchData: function (req, res) {
    Users.fetchData(function (data) {
      res.render("list", { userData: data });
    });
  },
  editData: function (req, res) {
    let editId = req.params.id;
    console.log("req.params.id", req.params.id);
    Users.editData(editId, function (data) {
      let changeUrl = req.originalUrl.slice(0, -24);
      if (changeUrl == "/list/parameters/") {
        res.render("form-update-parameters", { userData: data });
      } else {
        res.render("form-update-subjects", { userData: data });
      }
    });
  },
  updateData: function (req, res) {
    let inputData = req.body;
    inputData = {
      parameters: formParameters(inputData),
    };
    let editId = req.params.id;
    console.log("inputData", inputData);
    Users.updateData(inputData, editId, function (data) {
      res.send(" record was updated");
      console.log(" record was updated", data);
    });
  },

  addData: function (req, res) {
    let inputData = JSON.parse(JSON.stringify(req.body));
    console.log("=========>", inputData);
    let addNewtData = formSubjects(inputData);

    let editId = req.params.id;
    console.log("addNewtData", addNewtData);
    Users.addData(addNewtData, editId, inputData.subjects, function (data) {
      res.send(" record was updated");
      console.log(" record was updated", data);
    });
  },

  // --------------- custom model methods -----------

  findUserNameByLogin: async function (req, res) {
    const name = await modelUser.findUserNameByLogin(req.params.login);
    res.send(name);
  },

  findAllUsersByCity: async function (req, res) {
    await modelUser.findAllUsersByCity(req.params.city, (err, users) => {
      if (err) throw err;
      let names = users.map((user) => user.name);
      res.send(names);
    });
  },

  // findAllUsersFromCityById: async function (req, res) {
  //   await modelUser.findUserById(req.params.id, (err, user) => {
  //     user.findUsersFromThisCity((err, users) => {
  //       let names = users.map((user) => user.name);
  //       res.send(names);
  //     })
  //   })

  // }

  findAllUsersFromCityById: async function (req, res) {
      const users = await modelUser.findUsersFromThisCity(req.params.id);
    res.send(users);
  },



};
