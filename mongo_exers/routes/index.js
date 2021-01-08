var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

/* GET page. */
router.get("/", async function (req, res, next) {
  let entries = [];
  try {
     MongoClient.connect(url, async function (err, db) {
      if (err) throw err;
      db.db("proj1")
        .collection("1")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          entries = result;
          console.table(result);
          res.render("index", { entries: entries });
          db.close();
        });
    });
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;





//-------- 1 variant -------------//

// const { MongoClient } = require("mongodb");
// const uri = "mongodb://localhost:27017/";

// async function readDocs(client, cb){
//   await client.db("proj1").collection("1").find().toArray(function(err, docs) {
//     if(err)
//       throw err;
//     cb(docs);
//   });
// };

/* GET page. */
// router.get("/", async function (req, res, next) {
//   let entries = [];
//   try {
//     const client = new MongoClient(uri);
//     await client.connect();
//     console.log('connection open');
//     await readDocs(client, (entries) => {
//       console.table( entries);
//       res.render("index", {entries: entries});
//     });

//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//     console.log('connection closed');
//   }
// });

// module.exports = router;
