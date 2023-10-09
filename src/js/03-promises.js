import { Notify } from 'notiflix/build/notiflix-notify-aio';
//Здійснюється імпорт класу Notify з бібліотеки Notiflix. Цей клас використовується для виведення сповіщень на сторінці.

document.body.style.backgroundColor = '#f7eff4';
//Встановлюється колір фону для <body> на світло-рожевий (#f7eff4).
const form = document.querySelector('form.form');
//Встановлюється колір фону для <body> на світло-рожевий (#f7eff4).
const options = {
  position: 'center-bottom',
  distance: '15px',
  borderRadius: '15px',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};
// Настройка параметрів Notiflix Notify:
// Створюється об'єкт options, в якому визначаються налаштування для сповіщень, такі як позиція, відстань від нижнього краю сторінки, 
// радіус закруглення, тривалість відображення, можливість закрити сповіщення по кліку і стиль анімації.

form.addEventListener('click', onPromiseCreate);
// Додавання обробника подій "click" до форми:
// Додається обробник подій "click" до форми з класом "form". Обробник викликається при кліку на форму і виконує функцію onPromiseCreate.

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// Функція createPromise(position, delay):
// Ця функція приймає два аргументи: position (позиція) і delay (затримка).
// Вона створює новий Promise, який вирішується або відхиляється випадковим чином з ймовірністю більше 0,3 (70% ймовірність успіху).
// Через setTimeout визначається затримка для рішення Promise, яка залежить від переданого значення delay.

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    inputDelay += inputStep;

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          options
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          options
        );
      });
    e.currentTarget.reset();
  }
}
// Функція onPromiseCreate(e):
// Ця функція викликається при натисканні на кнопку в формі.
// Вона перехоплює подію e, зупиняє стандартну поведінку форми та отримує значення полів вводу для затримки, кроку і кількості обіцянок.
// Далі вона виконує цикл для створення обіцянок і додавання їх до черги для виконання.
// Кожна обіцянка створюється за допомогою createPromise і визивається метод then, якщо обіцянка успішна, або метод catch, якщо обіцянка відхиляється. У випадку успішної обіцянки виводиться сповіщення про успіх, а в іншому випадку - сповіщення про відхилення.
// Після цього форма очищається.
