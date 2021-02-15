const express = require("express");
const router = express.Router();
//const { ObjectId } = require("mongodb");

const Auth = require("../models/auth");


module.exports = {
 
  helloForm: async function (req, res) {
    console.log('token', req.headers['user-agent']);
    if (req.session.views) {
      req.session.views++;
      let auth = await Auth.findOne({token: req.headers['user-agent']}).exec();
      auth.views = req.session.views;
      auth.save(function (err, data) {
          if (err) throw err;
          res.render('hello', auth);
         
      });
    } else {
      req.session.views = 1;
      await Auth.generateUserAuth(req, res, function(auth) {
        res.render('hello', auth);
      });
      
    }
  },

  getVisitorById: async function (req, res) {
    let authVisitor = await Auth.findOne({token: req.headers['user-agent']}).exec();
    
      console.log('auth>>>>>>>>>', authVisitor);
      res.render('info', authVisitor);
     
    },

};
