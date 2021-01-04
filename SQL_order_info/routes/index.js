const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer();

const modelDrinks = require('../models/drinks');
const modelOrders = require('../models/orders');

const option = {
  options: '',
  loaderhide: '',
};

  // show form
router.get('/', async (req, res, next) => {
  const drinks = await modelDrinks.get();
   // fill drink list
  let str = '';      
  drinks.forEach((el) => {
    str = `${str}<option value="${el.Name}">${el.Name}</option><br>`
    });
  option.options = str;
  //option.loaderhide = 'display: none';
  res.render('index', option);
  //option.loaderhide = '';
});

//display order info
router.post('/', upload.none(), async (req, res) => {
  console.log('req.body:', req.body.drinks, req.body.range_start, req.body.range_end );
  const orders = await modelOrders.order_info(req.body.drinks, req.body.range_start, req.body.range_end);
  console.table(orders);
  const sum = await modelOrders.order_sum(req.body.drinks, req.body.range_start, req.body.range_end);
  console.log('sum',sum[0].Total);
// create table
  let str = `<h1>${req.body.drinks}</h1><br><table class="mytable"><th>DATE</th><th> ORDER ID</th><th>CUSTOMER NAME</th>`

  orders.forEach((el) => {
    str = `${str} <tr>
                <td>${el.Time}</td>
                <td>${el.Number}</td>
                <td>${el.Name}</td>
                </tr>`
  })
  //option.loaderhide = 'display: none';
  str = `${str} <table>`;
  str = `${str} <br><p>Sum: ${(sum[0].Total/100).toFixed(2)} UAH</p>`;
  res.send(str);
  //option.loaderhide = '';
 
});

module.exports = router;