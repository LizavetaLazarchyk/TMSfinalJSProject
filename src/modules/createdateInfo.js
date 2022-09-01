  export function createManeTime() {
    return new Date().toLocaleTimeString();
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  export function createWeekDay() {
    let dayNum = new Date().getDay();
    return days[dayNum];
  }

  const monthes = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  export function createMonth() {
    let monthNum = new Date().getMonth();
    return monthes[monthNum];
  }

  export function createDate() {
    return new Date().getDate();
  }
