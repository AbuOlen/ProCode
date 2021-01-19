const path = require('path');
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
    email: {
        type: Schema.Types.String,
        required: false,
        minLength: 5,
        maxLength: 50,
      },
    phone: {
        type: Schema.Types.String,
        required: true,
      },
    birthday: {
      type: Schema.Types.Date,
      required: true,
    },
    sex: {
      type: Schema.Types.String,
      enum: ["Male", "Female"],
      required: true,
    },
    parameters: {
      height: {
        type: Schema.Types.Number,
        required: false,
        minLength: 1,
        maxLength: 15,
      },
      weight: {
        type: Schema.Types.Number,
        required: false,
        minLength: 1,
        maxLength: 15,
      },
      fill_date: {
        type: Schema.Types.Date,
        default: Date.now,
        required: false,
      },
    },
    mathematics: [
      {
      mark: {
          type: Schema.Types.Number,
          required: false,
          min: 1,
          max: 12,
        },
      fill_date: {
        type: Schema.Types.Date,
        default: Date.now,
        required: false,
        },
      }
    ],
    literature: [
      {
      mark: {
          type: Schema.Types.Number,
          required: false,
          min: 1,
          max: 12,
        },
      fill_date: {
        type: Schema.Types.Date,
        default: Date.now,
        required: false,
        },
      }
    ],
   
    address: {
      zip: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 15,
      },
      country: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 15,
      },
      city: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 100,
      },
      street: {
        type: Schema.Types.String,
        required: true,
        minLength: 0,
        maxLength: 255,
      },
      bilding: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 256,
      },
      apartment: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 256,
      },
    },
  },
  { timestamps: true }
);


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;