
const fs = require('fs');

const imgSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 512px; width: 512px;"><rect fill="#417505" fill-opacity="1" height="512" width="512" rx="32" ry="32"></rect><g class="" transform="translate(5,0)" style="touch-action: none;"><path d="M105.186 26.426c-38.314.06-62.13 26.334-31.37 72.994C6.192 97.785-9.36 188.75 62.29 218.39c54.838 22.684 82.008-6.012 142.985 15.008-64.015-7.88-119.143 21.696-153.814 66.6-38.507 49.87-24.104 120.148 40.41 100.332-9.024 67.12 62.385 100.137 103.907 47.166 35.793-45.66 15.51-103.756 41.842-182.885 7.1 61.706-5.617 108.762 11.573 166.478 21.393 71.83 103.075 75.605 118.537 6.34 55.84 51.31 95.82-9.41 75.754-76.643-17.993-60.285-90.76-98.2-167.65-118.703 72.808-3.032 108.846 44.51 167.78 30.084 72.446-17.734 64.365-108.426-10.823-128.922 45.767-54.918-19.446-110.047-87.18-93.117-57.113 14.275-90.85 71.977-101.928 143.33-5.55-65.618-28.823-120.138-81.03-150.316-19.64-11.353-40.05-16.74-57.466-16.714z" fill="#fff" fill-opacity="1"></path></g></svg>';
fs.mkdir('folder1', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('folder1 created');
    fs.writeFile('folder1/1.svg', imgSVG, (err1) => {
      if (err1) {
        console.log(err1);
      } else {
        console.log('1.svg in folder1 created');
        fs.mkdir('folder2', (err2) => {
          if (err2) {
            console.log(err2);
          } else {
            console.log('folder2 created');
            fs.rename('folder1/1.svg', 'folder2/1.svg', (err3) => {
              if (err3) {
                console.log(err3);
              } else {
                console.log('1.svg moved to folder2');
              }
            });
          }
        });
      }
    });
  }
});
