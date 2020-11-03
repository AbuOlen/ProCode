const fs = require('fs');
const model = require('./model_2.js');
const fmt = require('./gen_dates.js');

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
  } catch (err) {
    console.log('err', err);
  }
});
