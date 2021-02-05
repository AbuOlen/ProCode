const express = require('express');
const router = express.Router();

const Coll1 = require('../../models/1');


                              // const articleController = require('controllers/article')
                              // const Ajv = require('ajv');
                              // const testSchema = require('routes/schemas/test');

// router.get('/', (req, res) => {
//   const temp = Coll1.find({ title: 'main' }).exec();
//   temp.then(r => console.log(r));
//   res.sendStatus(200);
//   });

  router.get('/', async(req, res) => {
    const temp = await Coll1.findOne({ title: 'main' });
    //temp.then((e,r) => console.log(e, r));
    //res.sendStatus(200);
    console.log(temp);
    res.send(temp)
    });
  
const doc1 = {
  author: {
    fullname: 'Michael3',
  }, 
  text: 'loremlorem',
};

router.get('/add', (req,res) => {
  Coll1.create(doc1);
  res.send('added doc1');
  
});
  
  
// router.get('/update', (req,res) => {
//    Coll1.updateOne({
//     title: 'qqq',
//   }, 
//   {
//     text: 'super',
//   },
//   (err, res) => {console.log('===res',err,res)}
//   );
 
//   res.send('updated')
// });

router.get('/update', (req,res) => {
  Coll1.updateMany({
   title: 'hello',
 }, 
 {
   text: 'super super super',
 },
 (err, res) => {console.log('===>>>res',err,res)}
 );
 res.send('updated');
});

// router.get('/delete', (req,res) => {
//   Coll1.deleteOne({
//    title: 'qqq',
//  }, 
//  (err, res) => {console.log('===>>>res',err,res)}
//  );
//  res.send('deleted');
// });


// router.get('/delete', async(req, res) => {
//   let response = await Coll1.deleteOne({
//    title: 'grge',
//  });
//  console.log(response);

//  res.send('deleted');
// });


router.get('/delete', async(req, res) => {
  let response = await Coll1.findById('5ffdcb7890c5f45d5a6bf395').deleteOne();
 console.log(response);
 res.send('deleted');
});


// ------------------------------

// router.get('/do', (req, res) => {
//  controller.funcDo(req,query)
//   console.log(req.query);
//   res.render('index', some);
// });

//------------------------------

  module.exports = router;
