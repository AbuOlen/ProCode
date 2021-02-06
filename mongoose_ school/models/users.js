const path = require("path");
const mongoose = require("mongoose");
const modelUser = require("../models/schemas/users");
const { ObjectId } = require('mongodb');

module.exports = {
  
 // create new data 
  createData: function (inputData, callback) {
    userData = new modelUser(inputData);
    userData.save(function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  fetchData: function (callback) {
    let userData = modelUser.find({});
    userData.exec(function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  editData: function (editId, callback) {
    let userData = modelUser.findById(editId);
    userData.exec(function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  
  updateData: function(inputData, editId, callback) {    
    userData = modelUser.findOneAndUpdate( {
      '_id': ObjectId(editId)}, {
        '$set':  inputData ,
      }
       );
    userData.exec(function(err, data){
      if (err) throw err;
       return callback(data);
    });
 },

  addData: function(inputData, editId, subject, callback) {    
    let userData = modelUser.findOne({
      _id: ObjectId(editId),
    }); 
    userData.exec(function(err, data){
      if (err) throw err;

      if(subject === 'mathematics') {
        data.subjects.mathematics.push(inputData)
      } else {
        data.subjects.literature.push(inputData)
      }
      data.save(function (err, data) {
        if (err) throw err;
        return callback(data);
      });
    });
 },

};
