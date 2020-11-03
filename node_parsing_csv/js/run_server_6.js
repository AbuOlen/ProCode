const http = require("http");

const PORT = 3000;

const runServer = (tab, dlink) => {
  http
    .createServer((req, res) => {
      console.log("req.url:", req.url);
      res.setHeader('Content-Type', 'text/html; charset=utf8');
      res.write('<a href="/tesla">обновить данные по Тесле</a>');
      if (req.url === "/tesla") {
        res.write(tab);
        res.write(`<a href=./${dlink}>${dlink}</a>`);
      }
      res.end();
    })
    .listen(PORT, () => {
      console.log("server run");
    });
};

module.exports = runServer;
