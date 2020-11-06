const http = require('http');
const fs = require('fs');
const getContent = require('./controller_3.js');

const PORT = 3000;

let filename = '';

http.createServer((req, res) => {
  console.log('req.url:', req.url);
  if (req.url === '/tesla') {
    getContent((tab, csvname) => {
      filename = csvname;
      res.setHeader('Content-Type', 'text/html; charset=utf8');
      res.write('<a href="/tesla">обновить данные по Тесле</a>');
      res.write(tab);
      res.write(`<a href=/${filename}>${filename}</a>`);
      res.end();
    });
  } else if (req.url === `/${filename}` && filename.length !== 0) {
    res.setHeader('Content-Type', 'text/csv; charset=utf8');
    const csvcontent = fs.readFileSync(filename, 'utf8');
    res.write(csvcontent);
    res.end();
  } else {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.write('<a href="/tesla">обновить данные по Тесле</a>');
    res.end();
  }
}).listen(PORT, () => {
  console.log('server run');
});
