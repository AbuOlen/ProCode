const path = require("path");
const mongoose = require("mongoose");

var http = require("http");
var parser = require("ua-parser-js");

const authSchema = require("./schemas/auth");

// ------generate user authorization model
authSchema.statics.generateUserAuth = async function (req, res, cb) {
  console.log(req.headers);
  let ua = parser(req.headers["user-agent"]);
  const authUser = new model({
    ip: req.connection.remoteAddress,
    browser: ua.browser.name + " " + ua.browser.version,
    os: ua.os.name + " " + ua.os.version,
    token: req.headers["user-agent"],
    views: req.session.views,
    referer: req.headers["referer"],
  });

  authUser.save(function (err, data) {
    if (err) throw err;
    console.log(data);
    cb(data);
  });
};

const modelname = path.basename(__filename, ".js"); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, authSchema); // собственно создаем модель
module.exports = model;
