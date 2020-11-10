var express = require('express');
var router = express.Router();

/* GET first page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'First page' });
});

router.get('/user/:id', function(req, res, next) {
    res.send('hello ' + req.params.id);
  });

module.exports = router;