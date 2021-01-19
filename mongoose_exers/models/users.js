const path = require("path");
const mongoose = require("mongoose");
const model = require("../models/schemas/users");


module.exports = {
  
 // create new data 
  createData: function (inputData, callback) {
    userData = new model(inputData);
    userData.save(function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  fetchData: function (callback) {
    let userData = model.find({});
    userData.exec(function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  editData: function (editId, callback) {
    let userData = model.findById(editId);
    userData.exec(function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  updateData:function(inputData, editId, callback){    
    userData= model.findOneAndUpdate( {_id: editId}, inputData);
    userData.exec(function(err, data){
      if (err) throw err;
       return callback(data);
    });
 },
};

