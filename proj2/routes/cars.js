var express = require('express');
var router = express.Router();

const params = {
    models: [3, 5, 6],
    toyotas: 15,
}

// router.get('/', function(req, res, next) {
                            //   res.render('cars_index', params);
//     res.send(`root: ${params.models[0]}`);
// });

// router.get('/toyota', function(req, res, next) {
//     res.send(`toyotas: ${params.toyotas}`);
//   });


//--------------------

// router.get('/author/:name/:book', (req,res) => {
//     console.log(typeof(req.params.name));
//     res.send(`author: ${req.params.name} book:${req.params.book}`)
// });


// router.get('/:a/:b', (req,res) => {
//     let arg1 = Number(req.params.a);
//     let arg2 = Number(req.params.b);
//     params.mul = arg1+arg2;
//                 // res.send(`${mul}`);
//     res.render('cars_index', params)
// });

// -------------------

router.get('/:a', (req,res) => {
    let arg1 = Number(req.params.a);
    params.arg1 = arg1;
    res.render('cars_index', params)
});

module.exports = router;