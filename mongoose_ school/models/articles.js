const path = require('path');
const mongoose = require('mongoose');

const generalSchema = require('./schemas/articles');

generalSchema.statics.createArt = async function (article) {
  console.log(article);
  const artData = await this.create(article);
  console.log(artData);
  return artData;
}

const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
