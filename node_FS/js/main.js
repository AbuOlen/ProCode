const request = require('request');
const fs = require('fs');

const url = 'https://dou.ua/';

const parseUrl = (r, html, startIdx) => {
  const sliced = html.substring(startIdx);
  const idx1 = sliced.indexOf('https://s.dou.ua/CACHE/images/img/announces/');
  const tmp = sliced.slice(idx1, idx1 + 200);
  const idx2 = tmp.indexOf('"');
  r.push(tmp.substring(0, idx2));
  return idx1 + idx2;
};

let arrImages = [];
request(url, (err, res, body) => {
  if (!err) {
    const result = [];
    let sIdx = body.indexOf('<h3>Советуем почитать</h3>');
    for (let i = 0; i < 10; i++) {
      sIdx += parseUrl(result, body, sIdx);
    }
    fs.writeFile('arr.txt', result, (err1) => {
      if (!err1) {
        fs.readFile('arr.txt', 'utf8', (err2, data) => {
          if (!err2) {
            arrImages = data.split(',');
            console.log(arrImages);
            let html = '<!DOCTYPE html></html><head></head><body>';
            for (let i = 0; i < arrImages.length; i++) {
              html += `<img src=${arrImages[i]}>`;
            }
            html += '</body></html>';
            fs.writeFile('index.html', html, (err3) => {
              if (err3) {
                console.log(err3);
              }
            });
          }
        });
      }
    });
  } else {
    console.log(err);
  }
});
