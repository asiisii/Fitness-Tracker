//Gets the date to play nice with the build in input date
function getDate(date) {
  return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
}

//Gets a different format of dates, that plays nice with the week selection.
function getShortDate(date) {
  return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '/' + date.getDate().toString().padStart(2, 0);
}

//Gets a date format that works with the built in input of week selection.
function getWeek(date) {
  var newDate = new Date(date.valueOf());
  var day = (date.getDay() + 6) % 7;

  newDate.setDate(newDate.getDate() - day + 3);

  var firstThursday = newDate.valueOf();
  newDate.setMonth(0, 1);

  if (newDate.getDay() !== 4) {
    newDate.setMonth(0, 1 + ((4 - newDate.getDay()) + 7) % 7);
  }
  return date.getFullYear().toString() + '-W' + (1 + Math.ceil((firstThursday - newDate) / 604800000));
}

//Dates are not universal across years, they don't work if you use "standard" dates programatically. It gets the first day of the week for a corresponding week number.
function getDateForWeek(week) {
  const yearWeek = week.split('-');
  const yearNumber = Number(yearWeek[0]);
  // Back slash capital D is a special character that represents non digit characters, lower case is the opposite.
  const weekNumber = Number(yearWeek[1].replace(/\D/g, ""));
  const firstDateOfWeek = new Date(yearNumber, 0, 1 + (weekNumber - 1) * 7);
  var dayOfWeek = firstDateOfWeek.getDay();
  var weekStart = firstDateOfWeek;
  // The number of weeks changes because of how many days are in the first week of the year.  So it gets real fucky.  Found this online. https://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
  if (dayOfWeek <= 4) {
      weekStart.setDate(firstDateOfWeek.getDate() - firstDateOfWeek.getDay() + 1);
  }
  else {
      weekStart.setDate(firstDateOfWeek.getDate() + 8 - firstDateOfWeek.getDay());
  }
  return weekStart;
}

function getDatesOfWeek(date) {
  const daysInWeek = [date];
  [1, 2, 3, 4, 5, 6].forEach(dayNumber => {
    const dayOfWeek = new Date(date.valueOf());
    dayOfWeek.setDate(dayOfWeek.getDate() + dayNumber);
    daysInWeek.push(dayOfWeek);
  })
  return daysInWeek;
}

if (typeof module !== 'undefined') {
  module.exports = {
    getDate,
    getShortDate,
    getWeek,
    getDdateForWeek,
    getDatesOfWeek,
  };
}