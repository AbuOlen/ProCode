const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let params = new FormData(formEl);
  answEl.innerHTML = '';
  axios.post('/login', params)
    
    .then(r => {
        let resp = r.data;
        if(resp.isValid) {
          this.window.location.href = `/hello?name=${resp.name}`;
        } else {
          answEl.innerHTML = resp.message;
        }
    });
});