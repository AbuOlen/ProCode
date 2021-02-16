const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = require("mongodb");

module.exports = new Schema(
  {
    ip: String,
    browser: String,
    os: String,
    token: String,
    views: Number,
    referer: String,
    country: String,
    country_flag: String,
    city: String,
  },
  { timestamps: true }
);
