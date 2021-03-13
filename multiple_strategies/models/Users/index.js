const path = require("path");
const mongoose = require("mongoose");
const generalSchema = require("./schema");
const { ObjectID } = require("mongodb");
const formToObj = (o) => {
  return {
    name: o.name,
    surname: o.surname,
    login: o.login,
    password: o.auth,
  };
};

// ----- for calculate Hash
const crypto = require("crypto");
const secret = "dfhdfh";
const calculateHash = function (passw) {
  return crypto.createHash("sha256", secret).update(passw).digest("hex");
};

// ----- create new data 
generalSchema.statics.createData = function (inputData, callback) {
  userData = new model(formToObj(inputData));
  userData.save(function (err, data) {
    if (err) throw err;
    return callback(userData);
  });
};

// -------create virtual field with hash
generalSchema
  .virtual("password")
  .get(function () {
    return "no data";
  })
  .set(function (passw) {
    this.auth = calculateHash(passw);
    console.log("hash saved");
  });
//-----------

// ----- calculate Hash
generalSchema.statics.calculateHash = function (passw) {
  return calculateHash(passw);
 };

generalSchema.statics.findUserAuthByLogin = async function (login, pass) {
  const userData = await this.findOne({ login: login }).exec();
  return userData;
};

generalSchema.statics.getUserByLogin = async function(login) {
  const user = await this.findOne({ "login": login});
  return user;
}

generalSchema.statics.verifyPassword = async function (userData, passw) {
  const hash = await calculateHash(passw);
  if (!userData) return false;
  return hash === userData.auth;
};


const modelname = path.basename(__dirname); 
const model = mongoose.model(modelname, generalSchema); 

module.exports = model;

