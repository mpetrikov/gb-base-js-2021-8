window.onbeforeunload = function () {
  return "Do you really want to close?";
};

const formElement = document.querySelector("form");
formElement.addEventListener("reset", (event) => {
  console.log("reset");
  event.preventDefault();
});

formElement.addEventListener("submit", (event) => {
  console.log("submit");
  event.preventDefault();
});

const selectElement = document.querySelector("form select");
selectElement.addEventListener("change", (event) => {
  console.log(event.target.value);
  console.log(
    event.target.options[event.target.options.selectedIndex].innerText
  );
});
const inputElement = document.querySelector("form input");

inputElement.addEventListener("focus", (event) => {
  console.log(event.target.value);
});

inputElement.addEventListener("blur", (event) => {
  console.log(event.target.value);
});

document.addEventListener("scroll", (event) => {
  console.log(window.pageYOffset);
});

document.body.addEventListener("copy", (event) => {
  const copiedText = document.getSelection().toString();
  event.clipboardData.setData(
    "text/plain",
    copiedText + " был скопирован с сайта sitename.com"
  );
  event.preventDefault();
});

window.addEventListener("contextmenu", (event) => {
  console.log("context menu", event.clientX, event.clientY);
  event.preventDefault();
});

const KEY_CODES = {
  f: 70,
};
document.body.addEventListener("keydown", (event) => {
  if (event.keyCode === KEY_CODES.f) {
    console.log("f pressed");
  }
});

const block2Element = document.getElementById("block2");
const block1Element = document.getElementById("block1");
const wrapperElement = document.getElementById("wrapper");

const clickHandler = (event) => {
  console.log("click on block 1");
};

block1Element.addEventListener("click", clickHandler);
block1Element.removeEventListener("click", clickHandler);
