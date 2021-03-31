//Variables
const welcome = document.getElementById('welcome');
const date = document.getElementById('date');
const week = document.getElementById('week');
const fluidOuncesHeader = document.getElementById('fluidOuncesHeader');
const fluidOuncesDateHeader = document.getElementById('fluidOuncesDateHeader');
const userDateFluidOunces = document.getElementById('userDateFluidOunces');
const fluidOuncesWeekHeader = document.getElementById('fluidOuncesWeekHeader');
const userAverageWeekFluidOunces = document.getElementById('userAverageWeekFluidOunces');
const lastSevenDaysHeader = document.getElementById('lastSevenDaysHeader');
const lastSevenDays = document.getElementById('lastSevenDays');
const averageAllSleepHeader = document.getElementById('averageAllSleepHeader');
const averageAllSleep = document.getElementById('averageAllSleep')

const avgHrsSleptPerday = document.getElementById('avgHrsSleptPerday')
const avgQualitySleep = document.getElementById('avgQualitySleep')

const userInfo = document.getElementById('userInfo');
const userName = document.getElementById('userName');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStride = document.getElementById('userStride');
const userGoal = document.getElementById('userGoal');
const userFriends = document.getElementById('userFriends');
const userAverageFluidOunces = document.getElementById('userAverageFluidOunces');

const usersArray = userData.map(user => new User(user))
const repository = new UserRepository(usersArray);

let filterWeek = null;
let filterDate = null;
let displayUser = repository.getUserData(1);

//EventListeners

window.addEventListener('DOMContentLoaded', (event) => {
  renderUser();
  week.value = getWeek(new Date());
  date.value = getDate(new Date());
});
// The time is required because of the weird way that HTML and Javascript read a date.
date.addEventListener('change', (event) => {
  filterDate = new Date(date.value + ':0:0:0');
  filterWeek = null;
  renderUser();
  date.value = getDate(new Date());
})

week.addEventListener('change', (event) => {
  filterWeek = getDatesOfWeek(getDateForWeek(week.value));
  filterDate = null;
  renderUser();
  week.value = getWeek(new Date());
})

//Functions

//Renders the inner text of the table that stores all the user info.

function renderUser() {
  welcome.innerText = `Welcome ${displayUser.getFirstName()}!`
  userName.innerText = displayUser.name;
  userAddress.innerText = displayUser.address;
  userEmail.innerText = displayUser.email;
  userStride.innerText = displayUser.strideLength;
  userGoal.innerText = displayUser.dailyStepGoal;
  userFriends.innerText = displayUser.friends.map(friendID => repository.getUserData(friendID).getFirstName()).join(", ");
  averageAllSleep.innerText = repository.getAverageAllSleep();
  avgHrsSleptPerday.innerText = displayUser.getAvgSleepInfo(sleepData, 1, 'hoursSlept')
  avgQualitySleep.innerText = displayUser.getAvgSleepInfo(sleepData, 1, 'sleepQuality')

  if (filterDate) {
    fluidOuncesDateHeader.innerText = `Fluid Ounces on ${getShortDate(filterDate)} :`;
    userDateFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData, getShortDate(filterDate));
  } else if (filterWeek) {
    fluidOuncesWeekHeader.innerText = `Average Fluid Ounces on week of ${getShortDate(filterWeek[0])} :`;
    userAverageWeekFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData, filterWeek.map(date => getShortDate(date)));
  } else {
    userAverageFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData);
  }
  let table = "<table>"
  getLastSevenDays(new Date()).forEach(date => {
    table += `<tr><th>${getShortDate(date)}</th><td>${displayUser.getAverageFluidOunces(hydrationData, getShortDate(date))}</td></tr>`
  })
  table += "</table>";
  lastSevenDays.innerHTML = table;
}


