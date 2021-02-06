const path = require("path");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { ObjectId } = require("mongodb");

module.exports = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    author: {
      type: Schema.Types.String,
      required: true,
      minLength: 1,
      maxLength: 255,
      ref: "users",
    },
    text: {
      type: Schema.Types.String,
      minLength: 1,
      maxLength: 2000,
    },
  },
  { timestamps: true }
);
