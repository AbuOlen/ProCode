var express = require('express');
var router = express.Router();
const pages = require('../models/model1.js');

const options = {
}

/* GET pages listing. */
router.get('/:a', function(req, res) {
    let arg1 = Number(req.params.a) - 1;
    options.str = pages[arg1];
    options.links = [];
    for (let i = 1; i <= pages.length; i++){
        options.links.push(i);
    };
    options.idx = arg1;
    res.render('pages_index', options);
});

module.exports = router;
