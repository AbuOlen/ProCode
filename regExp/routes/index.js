var express = require('express');
var router = express.Router();

const axios = require('axios');
axios.get('https://dou.ua')
.then(r => {
    const data = r.data;
    const redex = /((http(s?):\/\/)|(.\/))([\/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    const found = data.match(redex);
    console.log(found);
    console.log(found.length);
});

module.exports = router;
