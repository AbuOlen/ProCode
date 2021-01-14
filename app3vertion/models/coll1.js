const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({ 
  name: { 
    type: Schema.Types.String,
    default: 'no_title',
    minLength: 0,
    maxLength: 255,
  },
 author: { 
     fullname: {
        type: Schema.Types.String,
        required: true,
        minLength: 0,
        maxLength: 255,
     },
     tel: [
        {
        type:Schema.Types.String,
        required: true,
        minLength: 5,
        maxLength: 15,
        }
    ],
  },
text: {
    type: Schema.Types.String,
    required: true,
    minLength: 0,
    maxLength: 1024,
  },
tags: [
    {
    type: Schema.Types.Number,
    required: false,
    default: 1,
    min: 1,
    max: 99,
    }
],
}, { timestamps: true }); 



const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
