//const path = require("path");
const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = new Schema(
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

