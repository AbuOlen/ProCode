const path = require('path');
const mongoose = require('mongoose');

const articleSchema = require('./schemas/articles');
const Auth = require('../models/auth');

articleSchema.statics.createArt = async function (req, res, cb) {
  let article = req.body;
  let token = req.cookies['token'];
  if (token === undefined) {
    res.send({isValid: false});
    return;
  } 
  let auth = await Auth.findOne({token: token}).exec();
  article.author = auth.user;
  const artData = await this.create(article);
  console.log('artData>>>>>>', artData);
  cb(artData);
};

articleSchema.statics.findArt = async function (id) {
  const artData = await this.findById(id);
  console.log(artData);
  return artData;
};


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, articleSchema); // собственно создаем модель
module.exports = model;
