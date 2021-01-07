var express = require("express");
var router = express.Router();

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function readDocs(client, cb){
  await client.db("proj1").collection("1").find().toArray(function(err, docs) {
    if(err)
      throw err;
    cb(docs);
  });
};

/* GET page. */
router.get("/", async function (req, res, next) {
  let entries = [];
  try {
    await client.connect();
    await readDocs(client, (entries) => {
      console.table( entries);
      res.render("index", {entries: entries});
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

module.exports = router;
