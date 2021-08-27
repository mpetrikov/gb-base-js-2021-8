const sum = (a, b) => a + b;
const mul = (a, b) => a * b;

const mathHandler = (a, b, handler) => {
  return handler(a, b);
};

console.log(mathHandler(10, 5, mul));

// // Браузер генерирует число и приглашает пользователя к игре.
// // Выводится окно запроса предположения.
// // Браузер проверяет число и возвращает результат.
// // Повторяем до тех пор, пока число не будет угадано.
// // Как только число угадано, браузер сбрасывает число попыток и генерирует новое число.
// let randomNumber;
// let numberOfAttempts;
// const generateStartValues = () => {
//   randomNumber = Math.round(Math.random() * 1000);
//   alert(randomNumber);
//   numberOfAttempts = 0;
// };

// generateStartValues();

// while (true) {
//   const userNumberString = prompt("Введите число от 0 до 1000");
//   const userNumber = parseInt(userNumberString);
//   if (isNaN(userNumber)) {
//     continue;
//   }

//   numberOfAttempts++;

//   if (randomNumber == userNumber) {
//     alert(`Ты выиграл за ${numberOfAttempts} попыток!`);
//     generateStartValues();
//   } else if (randomNumber > userNumber) {
//     alert("Загаданное число больше!");
//   } else if (randomNumber < userNumber) {
//     alert("Загаданное число меньше!");
//   }
// }
