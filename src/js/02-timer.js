import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.start-btn');
const valueOfTime = document.querySelectorAll('.value');

let intervalId = null;

startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    const time = selectedDates[0] - options.defaultDate;
    startBtn.removeAttribute('disabled');
    startBtn.onclick = function () {
      clearInterval(intervalId);
      timer(time);
      startBtn.setAttribute('disabled', 'disabled');
    };
  },
};
flatpickr('input', options);

function timer(time) {
  // console.log('timer', time);
  marckUp(convertMs(time));
  intervalId = setInterval(() => {
    console.log(time);
    time -= 1000;
    marckUp(convertMs(time));
    if (time < 1000) clearInterval(intervalId);
  }, 1000);
}

function marckUp(obj) {
  const { days, hours, minutes, seconds } = obj;
  valueOfTime[0].textContent = days;
  valueOfTime[1].textContent = hours;
  valueOfTime[2].textContent = minutes;
  valueOfTime[3].textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
