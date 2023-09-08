// this function calculates the post created time duration from present date
export const timeStamp = (value: number) => {
  let currentDate = Number(new Date());
  let postedDate = Number(new Date(value));
  var difference = currentDate - postedDate;

  var seconds = Math.floor(difference / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  let createdDuration;
  if (years >= 1) {
    if (years === 1) {
      createdDuration = years + ' year';
    } else {
      createdDuration = years + ' years';
    }
  } else if (months >= 1) {
    if (months === 1) {
      createdDuration = months + ' month';
    } else {
      createdDuration = months + ' months';
    }
  } else if (days >= 1) {
    if (days === 1) {
      createdDuration = days + ' day';
    } else {
      createdDuration = days + ' days';
    }
  } else if (hours >= 1) {
    if (hours === 1) {
      createdDuration = hours + ' hour';
    } else {
      createdDuration = hours + ' hours';
    }
  } else if (minutes >= 1) {
    if (minutes === 1) {
      createdDuration = minutes + ' minute';
    } else {
      createdDuration = minutes + ' minutes';
    }
  } else if (seconds >= 1) {
    if (seconds === 1) {
      createdDuration = seconds + ' second';
    } else {
      createdDuration = seconds + ' seconds';
    }
  }
  return createdDuration;
};
