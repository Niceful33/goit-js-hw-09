import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const startBtn = document.querySelector('button[type="submit"]');
form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  startBtn.setAttribute('disabled', 'disabled');

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let delayEl = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);
  let totalDelay = delayEl + stepEl * amountEl;

  if (delayEl < 0 || stepEl < 0 || amountEl < 0) {
    Notify.failure('Alert!!!');
    return;
  }
  for (let position = 1; position <= amountEl; position += 1) {
    delayEl += stepEl;
    createPromise(position, delayEl);
  }
  showBtn(totalDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    } else {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    }
  }, delay);
}
function showBtn(total) {
  setTimeout(() => {
    startBtn.removeAttribute('disabled');
    form.reset();
  }, total);
}
