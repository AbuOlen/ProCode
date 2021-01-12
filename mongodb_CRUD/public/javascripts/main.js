const formEl = document.querySelector(".mainform");
const answEl = document.querySelector(".answ");

window.addEventListener("load", function (event) {
  const buttonDelete = document.querySelectorAll(".btn");

  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const params = new FormData(formEl);

    axios.post("/", params).then((r) => this.location.reload());
  });

  buttonDelete.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();

      const params = {};

      console.log(ev.target.parentNode);
      const ref = ev.target.parentNode.querySelector(".api-link");
      params.id = ref.href.substring(2);
      axios
        .delete(`${ref.href}`, params)
        .then((r) => (this.location.reload()));
      ev.target.parentNode.remove();
    });
  });
});
