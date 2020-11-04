const http = require('http');
const fs = require('fs');

const PORT = 3000;

const runServer = (tab, csvname) => {
  http.createServer((req, res) => {
    console.log('req.url:', req.url);
    const csvpath = `/${csvname}`;
    if (req.url === '/tesla') {
      res.setHeader('Content-Type', 'text/html; charset=utf8');
      res.write('<a href="/tesla">обновить данные по Тесле</a>');
      res.write(tab);
      res.write(`<a href=${csvpath}>${csvname}</a>`);
    } else if (req.url === csvpath) {
      res.setHeader('Content-Type', 'text/csv; charset=utf8');
      const csvcontent = fs.readFileSync(csvname, 'utf8');
      res.write(csvcontent);

    } else {
      res.setHeader('Content-Type', 'text/html; charset=utf8');
      res.write('<a href="/tesla">обновить данные по Тесле</a>');
    }
    res.end();
  }).listen(PORT, () => {
    console.log('server run');
  });
};

module.exports = runServer;
