const urlsEl = document.querySelector('.urls');

const links = (start, end) => {
  const port = Number(window.location.port);
  const ip = window.location.hostname;

  let str = '<ul>';
  for (let i = start; i <= end; i++) {
    if (!(i === port)) {
      str = `${str}<li><a href="http://${ip}:${i}">${i}<a></li>`;
    };
  };
  return `${str}</ul>`;
};

urlsEl.innerHTML = links(7001, 7006);

