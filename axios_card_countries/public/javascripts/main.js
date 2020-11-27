
  let inputEl = document.querySelector('.container');
  let loaderEl = document.querySelector(".loader");

  let region = document.querySelectorAll('input[name="radio"]');
  if( region ){
    for( let i = 0; i < region.length; i++ ){
      region[i].addEventListener("change", function(){
        let item = this.value; // this == the clicked radio, which launched the function
        loaderEl.style = "";
        document.location.replace(`/${item}`)
        console.log(item);
      });
    }
  }


  window.onload = () => {
    let pageURL = window.location.href;
      let val = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      if(typeof(val) === 'undefined') {
        val = "Europe";
      }
      if( region ){
        for( let i = 0; i < region.length; i++ ){
          if(region[i].value === val) {
            region[i].checked = true;
            break;
          }
        }
    }
  };
