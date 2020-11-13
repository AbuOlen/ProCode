var express = require('express');
var router = express.Router();

const request = require('request');

const options = {
    img_src: ""
};

/* GET dog image. */
router.get('/', function(req, res, next) {
  res.render('dogs_index', options);
});

// -------------------- with Promise ------------------

router.get('/load', function(req, res) {
 const p1 = new Promise(function(resolve, reject) {
    request('https://dog.ceo/api/breeds/image/random', (e, r, body) => {
        if(e) {
            reject(e);
        } else {
            const temp = JSON.parse(body);
            options.img_src = temp.message;
            res.redirect('/dogs');
            resolve(res);
        }
      });
 });
});

module.exports = router;


// ------------------ with Axios ---------------------

// const axios = require('axios');

// router.get('/load', function(req, res, next) {
//     axios.get('https://dog.ceo/api/breeds/image/random')
//     .then(function(response) {
//          // handle success
//          options.img_src = response.data.message;
//          res.redirect('/dogs');
//         console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//     .then(function () {
//         // always executed

//     });
// });