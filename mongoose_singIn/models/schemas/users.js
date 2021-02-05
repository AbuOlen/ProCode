const path = require("path");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const generalSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    surname: {
      type: Schema.Types.String,
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    login: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 15,
    },
    auth: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 512,
    },
  },
  { timestamps: true }
);

// ----- calculate Hash
const crypto = require("crypto");
const secret = "dfhdfh";

const calculateHash = function (passw) {
  return crypto.createHash("sha256", secret).update(passw).digest("hex");
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

generalSchema.statics.findUserAuthByLogin = async function (login) {
  const userData = await this.findOne({ login: login }).exec();
  return userData;
};

generalSchema.statics.verifyPassword = async function (userData, passw) {
  const hash = await calculateHash(passw);
  if (!userData) return false;
  return hash === userData.auth;
};

const modelname = path.basename(__filename, ".js"); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
