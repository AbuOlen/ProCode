const orders = require('./order.js');

const dateArray = [
    Date.parse('04 Dec 1995 00:12:00 GMT'),
    Date.parse('14 Jan 2000 03:42:00 GMT'),
    Date.parse('05 Nov 1998 10:12:00 GMT'),
    Date.parse('06 Jun 1999 02:22:00 GMT'),
    Date.parse('30 May 2002 03:52:00 GMT'),
    Date.parse('11 Dec 2000 12:22:00 GMT'),
    Date.parse('12 Sep 2005 11:13:00 GMT')
];

const arr = orders(10, dateArray);
console.table(arr);