const fs = require('fs');
const model = require('./model_2.js');
const fmt = require('./gen_dates.js');
const tableHTML = require('./view5.js');
const https = require('./run_server_6.js');


const generateCsv = (array) => {
  let csv = 'Model;Year;USD;UAH\n';
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (j < 2) {
        csv += `"${array[i][j]}";`;
      } else if (j === 3) {
        csv += `${array[i][j]}`;
      } else {
        csv += `${array[i][j]};`;
      }
    }
    csv += '\n';
  }
  return csv;
};

let arr = [];
model((result) => {
  arr = result;
  try {
    if (arr.length === 0) {
      throw 'array is empty';
    }
    if (arr[0].length !== 4) {
      throw 'wrong column count';
    }
    const csv = generateCsv(arr);
    const fname = fmt(new Date());
    if (fname === '') {
      throw 'invalid file name';
    }
    fs.writeFileSync(`${fname}.csv`, csv);
    const tab = tableHTML(arr);
    https(tab, `tesla_${fname}.csv`);
  } catch (err) {
    console.log('err', err);
  }
});

module.exports = generateCsv;
