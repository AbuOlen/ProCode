
const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let params = new FormData(formEl);
    axios.post('/upload', params)
    .then(r => {
        let imgs = r.data.map((str) => {
            return `<img src="/img/${str}" loading="lazy">`;
        });
        answEl.innerHTML = imgs.join('');
        formEl.reset();
    });

});