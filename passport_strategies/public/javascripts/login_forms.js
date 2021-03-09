//const formEl = document.querySelector('.mainform');
const googlEl = document.querySelector('.googleform');
const facebEl = document.querySelector('.facebookform');
const answEl = document.querySelector('.answ');

googlEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  window.location.href = "/google";
});

facebEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  window.location.href = "/facebook";
});

