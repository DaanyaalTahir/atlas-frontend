export const getTrackerIcon = (itemType) => {
  console.log(itemType);
  switch (itemType) {
    case "car":
      return require("../assets/car.png");
    case "bag":
      return require("../assets/backpack.png");
    case "person":
      return require("../assets/person.png");
    default:
      return require("../assets/default-placeholder.png");
  }
};
