const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let params = new FormData(formEl);
  answEl.innerHTML = '';
  axios.post('/articles/create', params)
  .then(r => {
    let resp = r.data;
    if(!resp.isValid) {
      this.window.location.href = '/login';
    } else {
      answEl.innerHTML = resp.message;
      //resp.message;
    }
});
    // .then(r => {
    //     answEl.innerHTML = r.data;
    // });
});