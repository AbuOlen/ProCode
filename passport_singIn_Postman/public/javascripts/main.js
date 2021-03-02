const formEl = document.querySelector('.mainform');
const statusEl = document.querySelector('.status');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const params = new FormData(formEl);
    statusEl.innerHTML = '';
    axios.post('/add', params)
    .then(r => answEl.innerHTML = r.data);
        
    });



