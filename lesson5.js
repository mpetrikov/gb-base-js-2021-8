// setAttribute
const listOfAnimals = document.querySelector(".animal-line");
console.log(listOfAnimals.getAttribute("data"));
listOfAnimals.setAttribute("some-attribute", "someValue");

// replaceChild

const listOfAnimals2 = document.querySelector(".animal-list");

const newAnimal = document.createElement("li");
newAnimal.innerText = "Giraffes";
newAnimal.classList.add("animal-line");

const firstAnimal = document.querySelector(".animal-line");
firstAnimal.innerHTML = "<li>Giraffe</li>";

listOfAnimals2.replaceChild(newAnimal, firstAnimal);

// remove

const allLines = document.querySelectorAll(".animal-line");
allLines[0].remove();

// insertAdjacentHTML

const elementsByClassName = document.getElementsByClassName("animal-list");
const animalList = elementsByClassName[0];

animalList.insertAdjacentHTML(
  "beforeend",
  "<li class='animal-line'>Giraffes</li>"
);

// insertBefore crocodiles

const listOfAnimals3 = document.querySelector(".animal-list");

const turtles = document.createElement("li");
turtles.innerText = "Turtles";
turtles.classList.add("animal-line");

const crocodiles = document.querySelectorAll(".animal-line")[2];

listOfAnimals3.insertBefore(turtles, crocodiles);

// createElement and appendChild

const newList = document.createElement("ul");

const newAnimal1 = document.createElement("li");
newAnimal.innerText = "Giraffes";
newAnimal.classList.add("animal-line");

newList.appendChild(newAnimal);

// textContent

const header = document.getElementById("header");
console.log(header.textContent.length, header.textContent.trim().length);

// parentElement, childNodes, children

const elementByName = document.querySelector("div .animal-line");
console.log(elementByName);
console.log(elementByName.parentElement.childNodes);
console.log(elementByName.parentElement.children);

// querySelectorAll в дочернем элементе

const elementsByClassName1 = document.getElementsByClassName("animal-list");
const animalList1 = elementsByClassName1[0];
console.log(animalList1.querySelectorAll("li"));

// querySelectorAll

const elementsByName = document.querySelectorAll("div .animal-line");
console.log(elementsByName);

// getElementsByName

const elementsByName2 = document.getElementsByName("animalList");
console.log(elementsByName2);

// getElementsByClassName

const elementsByClassName2 = document.getElementsByClassName("animal-list");
console.log(elementsByClassName2);

// getElementsByTagName

const elementsOfList = document.getElementsByTagName("li");
console.log(elementsOfList);

// getElementById

const header1 = document.getElementById("header");
console.log(header);
