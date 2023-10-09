import flatpickr from 'flatpickr';//- це бібліотека для роботи з вибором дати та часу.
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';//- це бібліотека для виведення сповіщень на сторінці.

const date = document.querySelector('#datetime-picker');//- це елемент input з id "datetime-picker", який буде використовуватися для вибору дати та часу.
const btn = document.querySelector('[data-start]');//- це кнопка, позначена атрибутом "data-start", яка запускає таймер.
const day = document.querySelector('[data-days]');//- це елементи, в яких буде відображатися залишений час (дні, години, хвилини та секунди).
const hour = document.querySelector('[data-hours]');//- це елементи, в яких буде відображатися залишений час (дні, години, хвилини та секунди).
const min = document.querySelector('[data-minutes]');//- це елементи, в яких буде відображатися залишений час (дні, години, хвилини та секунди).
const sec = document.querySelector('[data-seconds]');//- це елементи, в яких буде відображатися залишений час (дні, години, хвилини та секунди).
const spans = document.querySelectorAll('.value');//- це колекція всіх елементів з класом "value", які будуть оновлюватися у часі.
 
let timerId = null;

btn.disabled = true;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.disabled = true;
    } else {
      btn.disabled = false;

      Notiflix.Notify.success('Lets go?');
    }
  },
});
// Використовується бібліотека flatpickr для створення інтерактивного календаря та вибору часу.
// Встановлюється налаштування, щоб дозволити вибирати дату та час, включаючи час у форматі 24 години.
// Встановлюється поточна дата та час за замовчуванням.
// Визначається хвилинна інкрементація в одну хвилину.
// У обробнику onClose перевіряється, чи вибрана дата в майбутньому, і в залежності від цього виводяться сповіщення.

btn.addEventListener('click', onBtnStartClick);
//Додавання обробника події на кнопку:
//Кнопці з атрибутом "data-start" додається обробник події "click", який викликає функцію onBtnStartClick

function onBtnStartClick() {
  spans.forEach(item => item.classList.toggle('end'));
  btn.disabled = true;
  date.disabled = true;
  timerId = setInterval(() => {
    const choosenDate = new Date(date.value);
    const timeToFinish = choosenDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);

    if (timeToFinish < 1000) {
      spans.forEach(item => item.classList.toggle('end'));
      clearInterval(timerId);
      date.disabled = false;
    }
  }, 1000);
}
//Функція onBtnStartClick():
// При натисканні на кнопку:
// Всім елементам з класом "value" додається клас "end", що, ймовірно, використовується для стилізації.
// Кнопка стає неактивною.
// Поле вибору дати та часу також стає неактивним.
// Запускається інтервал, який кожну секунду оновлює залишений час.
// Коли залишений час стає меншим за секунду, інтервал очищається, і елементи знову отримують клас "end", а поле вибору дати та часу стає активним.

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// Функція convertMs(ms):
// Ця функція приймає кількість мілісекунд і конвертує їх у дні, години, хвилини та секунди.

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
//Функція addLeadingZero(value):
// Ця функція додає ведучий нуль до числового значення, якщо воно менше 10.