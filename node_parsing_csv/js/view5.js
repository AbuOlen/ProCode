
const makeTableHTML = (arr) => {
  let result = '<table border=1>';
  for (let i = 0; i < arr.length; i++) {
    result += '<tr>';
    for (let j = 0; j < arr[i].length; j++) {
      result += `<td>${arr[i][j]}</td>`;
    }
    result += '</tr>';
  }
  result += '</table>';

  return result;
};

module.exports = makeTableHTML;
