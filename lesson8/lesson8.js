// fetch, axios
// промисы / async await
// callback hell

// функции генераторы
// yield

// прототипное наследование

// try catch

// gulp webpack rollup
// npm - node js package manager
// node_modules

// react vue angular

// draggableDiv.addEventEmitter("drag", debounce(() => {

// }, 100));
// debounce
// throttle

const autoServiceObject = {
  _listOfCars: [],
  addCarToList: function (carName) {
    this._listOfCars.push(carName);
  },
  getCarsInList: function () {
    return [...this._listOfCars];
  },
};

// high order function
// HOF
function mathExpression(mathFunction, a, b) {
  return mathFunction(a, b);
}

// чистая функция - pure function
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 5));

// Immediately Invoked Function Expression
// IIFE
const autoService = (function () {
  const listOfCars = [];

  const addCarToList = (carName) => {
    listOfCars.push(carName);
  };

  const getCarsInList = () => {
    return [...listOfCars];
  };

  return {
    addCarToList,
    getCarsInList,
  };
})();

autoService.addCarToList("Audi");
console.log(autoService.getCarsInList());

/**
 * Класс user
 * @constructor()
 * @param
 */
class User {
  constructor(userName) {
    this.userName = userName;

    const buttonElement = document.querySelector("button");
    buttonElement.addEventListener("click", this.showUserName);
  }

  /**
   *
   * @param {Event} event
   */
  showUserName = (event) => {
    console.log(this.userName);
    console.log(event);
  };
}

const vasya = new User("vasya");

const button1 = document.querySelector("button");
button1.addEventListener("click", (event) => {
  console.log(this);
  console.log(this === event.target);
});

const button2 = document.querySelector("button");
button2.addEventListener("click", function (event) {
  console.log(this);
  console.log(this === event.target);
});

const startTime = Date.now();
let counter = 0;

const intervalHandle = setInterval(() => {
  console.log(Date.now() - startTime);
  counter++;

  //   someTime *= 1000;
}, 1000);

for (let i = 0; i < 10000000; i++) {}

const a = () => {
  console.log("a");
};

const b = () => {
  console.log("b");
};

setTimeout(a, 0);
setTimeout(a, 0);
setTimeout(a, 0);
setTimeout(a, 0);
setTimeout(a, 0);
setTimeout(a, 0);
b();

const allElementsCount = 1000000000;
let currentElement = 0;
let chunkOfHandle = 100000000;

const handler = () => {
  console.time();
  const finishElement = currentElement + chunkOfHandle;
  for (; currentElement < finishElement; currentElement++) {}
  console.timeEnd();

  if (currentElement < allElementsCount) {
    setTimeout(handler, 0);
  }
};

handler();

// fn fn fn fn fn fn

const user3 = {
  name: "Petr",
  sayHello: function () {
    console.log(this);

    setTimeout(function () {
      console.log(this);
    }, 1000);

    setTimeout(() => {
      console.log(this);
    }, 2000);
  },
};

user3.sayHello();

const user2 = {
  userName: "Petr",
  sayHello: (place) => {
    console.log(this);
    console.log(`Hello ${this.userName} from ${place}`);
  },
};

user2.sayHello("Moscow");

const user1 = {
  userName: "Petr",
  sayHello: function (place) {
    console.log(`Hello ${this.userName} from ${place}`);
  },
};

const sayHello1 = user1.sayHello;

sayHello1.apply(user1, ["Moscow"]);
sayHello1.call(user1, "Moscow");

const sayHello2 = user1.sayHello;
sayHello2();

("use strict");
let a1 = 5;

console.log(window.a1);

function f() {
  console.log(this.a1);
}

f();

console.log(this);

//функция - объект первого класса
const funcStepByStep = function (function1, function2) {
  return () => {
    function1();
    function2();
  };
};

const showMyName = () => console.log("Max");
const showMyAge = () => console.log(35);

const ourSumFunction = funcStepByStep(showMyName, showMyAge);
ourSumFunction();
