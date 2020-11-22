let btnEl = document.querySelector('.btnOK');
  let inputEl = document.getElementById('movies');
  let loaderEl = document.querySelector(".loader");
  btnEl.addEventListener('click', () => {
    loaderEl.style = "";
    document.location.replace(`/${inputEl.selectedIndex}`)
  });

  window.onload = () => {
    let pageURL = window.location.href;
      let idx = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      if(typeof(idx) === 'undefined') {
        idx = 0;
      }
      inputEl.selectedIndex = Number(idx);
  };