const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let params = new FormData(formEl);
  answEl.innerHTML = '';
  axios.post('/register', params)
    .then(r => {
        answEl.innerHTML = r.data;
    });
});