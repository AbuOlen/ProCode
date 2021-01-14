const express = require('express');
const router = express.Router();

const Coll1 = require('../../models/coll1');



// const articleController = require('controllers/article')
// const Ajv = require('ajv');
// const testSchema = require('routes/schemas/test');

router.get('/', (req, res) => {
  const temp = Coll1.findOne({ title: 'main' }).exec();
  temp.then(r => console.log(r));
  res.sendStatus(200);
  });


module.exports = router;
