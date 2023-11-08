export const getTrackerIcon = (itemType) => {
  switch (itemType) {
    case "car":
      return require("../assets/car.png");
    case "bag":
      return require("../assets/backpack.png");
  }
};
