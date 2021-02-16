const express = require("express");
const router = express.Router();
const axios = require('axios');

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
      await Auth.deleteMany({token: req.headers['user-agent']}).exec();
      req.session.views = 1;
      vizitorIp = req.connection.remoteAddress.substring(7);
      await axios.get(`http://api.ipapi.com/${vizitorIp}?access_key=067bcdcc90ae577cb81decf6696e3061`)
      .then((jsonGeo) => {
        console.log('jsonGeo>>>>>>', jsonGeo.data);
        Auth.generateUserAuth(req, res, jsonGeo, function(auth) {
        res.render('hello', auth);
      });

      })
      
      
    }
  },

  getVisitorById: async function (req, res) {
    let authVisitor = await Auth.findOne({token: req.headers['user-agent']}).exec();
      console.log('auth>>>>>>>>>', authVisitor);
      res.render('info', authVisitor);
     
    },

};
