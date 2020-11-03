const request = require('request');

const url = 'https://auto.ria.com/uk/search/?category_id=1&marka_id=2233&model_id=0&city%5B0%5D=0&state%5B0%5D=0&s_yers%5B0%5D=0&po_yers%5B0%5D=0&price_ot=&price_do=';

const findBetween = (str, start, end) => {
  const idx1 = str.indexOf(start);
  const tmp = str.slice(idx1);
  const idx2 = tmp.indexOf(end);
  return tmp.substring(start.length, idx2);
};

const parseUrl = (arr, html, startIdx) => {
  const sliced = html.substring(startIdx);
  const idx1 = sliced.indexOf('<span class="blue bold">');
  const tmp = sliced.slice(idx1, idx1 + 600);
  const idx2 = tmp.indexOf('грн');
  const tmpModel = tmp.substring(0, idx2);
  if (tmpModel.length === 0) return 0;
  arr.push(tmpModel);
  return idx1 + tmpModel.length;
};


const getData = (cb) => {
  request(url, (err, res, body) => {
    const raw = [];
    const result = [];
    let sIdx = 0;
  
    for (;;) {
      const diff = parseUrl(raw, body, sIdx);
      if (diff === 0) break;
      sIdx += diff;
    }
  
    for (let i = 0; i < raw.length; i++) {
      const row = [];
      row.push(findBetween(raw[i], '<span class="blue bold">', '</span>'));
      row.push(findBetween(raw[i], '</span>', '</a>'));
      const priceUSD = findBetween(raw[i], '"USD">', '</span>&nbsp;');
      row.push(parseInt(priceUSD.split(' ').join(''), 10));
      const priceUAH = findBetween(raw[i], '"UAH">', '</span>&nb');
      row.push(parseInt(priceUAH.split(' ').join(''), 10));
      result.push(row);
    }
    cb(result);
  });
};

module.exports = getData;
