import { autoservice } from "./autoservice.js";

autoservice.addCarToList("Audi");

const listOfCars = autoservice.getListOfCars();
listOfCars.push("BMW");

console.log(autoservice.getListOfCars());
