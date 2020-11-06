const fs = require('fs');
const getData = require('./model_2.js');
const fmt = require('./gen_dates.js');
const tableHTML = require('./view5.js');


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

const getContent = (cb) => {
  getData((result) => {
    try {
      if (result.length === 0) {
        throw 'array is empty';
      }
      if (result[0].length !== 4) {
        throw 'wrong column count';
      }

      const csv = generateCsv(result);
      const fname = fmt(new Date());

      if (fname === '') {
        throw 'invalid file name';
      }

      const csvname = `tesla_${fname}.csv`;
      fs.writeFileSync(csvname, csv, 'utf8');

      const tab = tableHTML(result);
      cb(tab, csvname);
    } catch (err) {
      console.log('err', err);
    }
  });
};

module.exports = getContent;
