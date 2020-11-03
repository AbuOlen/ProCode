const dateFormat = require('dateformat');

const printCurrentTime = date => dateFormat(date, 'yyyymmdd-HHMMss');

// console.log(printCurrentTime(new Date()));

module.exports = printCurrentTime;
