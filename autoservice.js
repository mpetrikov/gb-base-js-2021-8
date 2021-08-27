const listOfCars = [];

const addCarToList = (carName) => {
  listOfCars.push(carName);
};

const getListOfCars = () => {
  return [...listOfCars];
};

export const autoservice = {
  addCarToList,
  getListOfCars,
};
