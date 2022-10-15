const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  startBtn.setAttribute('disabled', 'disabled');
  changeBodyColor();
  timerId = setInterval(changeBodyColor, 1000);
}

function onStopBtn() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
}

function changeBodyColor() {
  body.style.background = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
