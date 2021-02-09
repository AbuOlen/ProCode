const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = require("mongodb");

module.exports = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    ip: String,
    os_browser: String,
    expire: Date,
    token: String,
  },
  { timestamps: true }
);
