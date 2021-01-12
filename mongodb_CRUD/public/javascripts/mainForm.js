const formElForm = document.querySelector('.mainform_form');
const answEl = document.querySelector('.answ');


formElForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const params = new FormData(formElForm);
    params.append('id', location.href.replace(location.origin,'').substr(1));
  
    axios.post('/', params)
    .then(r => answEl.innerHTML = r.data); 
    });

    //window.location.href='/';
   

