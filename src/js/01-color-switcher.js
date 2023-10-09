const CHANGE_COLOR_DELAY = 1000;
//CHANGE_COLOR_DELAY - це константа, яка визначає інтервал часу (у мілісекундах) між змінами кольору фону.
let idInt = null;
//let idInt = null; - змінна idInt використовується для збереження ідентифікатора інтервалу,
// який буде запускатися та припинятися при натисканні кнопок "Start" і "Stop".
const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}
//refs - це об'єкт, який містить посилання на елементи DOM (Document Object Model) сторінки, такі як кнопки і body.

refs.btnStop.disabled = true;//- спочатку кнопка "Stop" вимкнена, що означає, що вона неактивна.
//Далі йдуть два обробники подій: 
refs.btnStart.addEventListener('click', onBtnStartChangeColor);//- коли натискається кнопка "Start", викликається функція onBtnStartChangeColor.
refs.btnStop.addEventListener('click', onBtnStopChangeColor);//- коли натискається кнопка "Stop", викликається функція onBtnStopChangeColor.

function onBtnStartChangeColor() {
    refs.btnStart.disabled = true; //Кнопка "Start" вимикається (становиться неактивною).
    refs.btnStop.disabled = false; //Кнопка "Stop" увімкнюється (становиться активною).

    idInt = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, CHANGE_COLOR_DELAY);
    //Встановлюється інтервал, який кожні CHANGE_COLOR_DELAY мілісекунд викликає функцію getRandomHexColor та змінює колір фону body.
}


function onBtnStopChangeColor() {
    refs.btnStart.disabled = false; //Кнопка "Start" увімкнюється (становиться активною).
    refs.btnStop.disabled = true; //Кнопка "Stop" вимикається (становиться неактивною).
    clearInterval(idInt); //Інтервал, запущений раніше в onBtnStartChangeColor, припиняється за допомогою clearInterval(idInt).
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  //getRandomHexColor - це функція, яка генерує випадковий колір у форматі HEX (шістнадцяткової системи числення) та повертає його.
  //У цій функції використовується Math.random() для генерації випадкового числа та toString(16) для представлення його у
  //шістнадцятковому форматі. Колір доповнюється нулями зліва, щоб він завжди мав шість символів (наприклад, "#FF00AA").