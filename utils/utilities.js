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

export const getReadableTime = (dateObj) => {
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  let seconds = dateObj.getUTCSeconds();

  // Convert to 12-hour format
  let period = "AM";
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  // Add leading zeros to minutes and seconds if they are less than 10
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let readableTime = hours + ":" + minutes + ":" + seconds + " " + period;

  return readableTime;
};
