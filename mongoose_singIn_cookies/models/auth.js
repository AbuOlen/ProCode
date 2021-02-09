const path = require('path');
const mongoose = require('mongoose');

const authSchema = require('./schemas/auth');

// ----- calculate Hash
const crypto = require("crypto");
const secret = "dfhdfh";

const calculateHash = function (passw) {
  return crypto.createHash("sha256", secret).update(passw).digest("hex");
};

// ------- generate Token
authSchema.statics.generateAuthToken = async function (req, res, user) {
    let host = req.headers.host;
    let userAgent = req.get('user-agent');
    return calculateHash(host.concat(userAgent, user._id));
  },

// ----calculate Expire
authSchema.statics.calculateExpire = function () {
  return new Date(Date.now() + 1000 * 60);
};

// ------generate user authorization model
authSchema.statics.generateUserAuth = async function (req, res, user, cb) {
    const authUser = new model({
      user: user._id,
      ip: req.headers.host,
      os_browser: req.get('user-agent'),
      expire: this.calculateExpire(),
      token: await this.generateAuthToken(req, res, user),
    });

    authUser.save(function (err, data) {
        if (err) throw err;
        res.cookie('token', data.token);
        res.cookie('expired', data.expire.toUTCString());
        console.log(data);
        return cb(err);
      });
  };


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, authSchema); // собственно создаем модель
module.exports = model;
