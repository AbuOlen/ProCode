const formEl = document.querySelector('.form_subjects');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let params = new FormData(formEl);
  answEl.innerHTML = '';
  axios.post(formEl.action, params)
    
    .then(r => {
        answEl.innerHTML = r.data;
    });
});