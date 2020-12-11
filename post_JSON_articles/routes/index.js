var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer();
const fs = require("fs").promises;
const path = require("path");

const options = {};
const json_arr = [];

router.get("/", function (req, res) {
  res.render("index", options);
});

router.post("/api", upload.none(), (req, res) => {
  // add form data to array
  json_arr.push(req.body);
  // save array to JSON file
  const arr_upd = async () => {
    await fs.writeFile("main.json", JSON.stringify(json_arr))
    .then(() => {
      console.log(JSON.stringify(json_arr));
      return true;
    })
    .catch((err) => {
      console.error("Failed", err);
      return false;
    });
  };
  let success = arr_upd();
  if(success) {
    res.send("Data saved successfuly");
  } else {
    res.send("Failed to write data");
  }
  res.end();
});

router.get("/api", function (req, res) {
  // get full path
  let mypath = path.join(__dirname, "../main.json");
  res.sendFile(mypath);
});

module.exports = router;
