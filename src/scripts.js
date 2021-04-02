//Variables
const welcome = document.getElementById('welcome');
const date = document.getElementById('date');
const week = document.getElementById('week');
const fluidOuncesHeader = document.getElementById('fluidOuncesHeader');
const fluidOuncesDateHeader = document.getElementById('fluidOuncesDateHeader');
const userDateFluidOunces = document.getElementById('userDateFluidOunces');
const fluidOuncesWeekHeader = document.getElementById('fluidOuncesWeekHeader');
const userAverageWeekFluidOunces = document.getElementById('userAverageWeekFluidOunces');
const lastSevenWaterDaysHeader = document.getElementById('lastSevenWaterDaysHeader');
const lastSevenWaterDays = document.getElementById('lastSevenWaterDays');
const averageAllSleepHeader = document.getElementById('averageAllSleepHeader');
const averageAllSleep = document.getElementById('averageAllSleep');
const hrsSleptAcrossSevenDaysHeader = document.getElementById('hrsSleptAcrossSevenDaysHeader');
const hrsSleptAcrossSevenDays = document.getElementById('hrsSleptAcrossSevenDays');
const lastSevenSleepDaysHeader = document.getElementById('lastSevenSleepDaysHeader');
const lastSevenSLeepDays = document.getElementById('lastSevenSleepDays');
const lastSevenSleepQualityDaysHeader = document.getElementById('lastSevenSleepQualityDaysHeader');
const lastSevenSleepQUalityDays = document.getElementById('lastSevenQualityDays');
const lastSevenDaysBestSleepsHeader = document.getElementById('lastSevenDaysBestSleepsHeader');
const lastSevenDaysBestSleeps = document.getElementById('lastSevenDaysBestSleeps');

const avgHrsSleptPerday = document.getElementById('avgHrsSleptPerday')
const avgQualitySleep = document.getElementById('avgQualitySleep')
const hrsSleptByDateHeader = document.getElementById('hrsSleptByDateHeader')
const hrsSleptByDate = document.getElementById('hrsSleptByDate')
const qualitySleepByDateHeader = document.getElementById('qualitySleepByDateHeader')
const qualitySleepByDate = document.getElementById('qualitySleepByDate')
const hypersomnia = document.getElementById('hypersomnia')

const getActiveMinsOnDayHeader = document.getElementById('getActiveMinsOnDayHeader')
const getActiveMinsOnDay = document.getElementById('getActiveMinsOnDay')
const getActiveMinsOnWeekHeader = document.getElementById('getActiveMinsOnWeekHeader')
const getActiveMinsOnWeek = document.getElementById('getActiveMinsOnWeek')
const checkStepGoal = document.getElementById('checkStepGoal')


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
  // console.log(week.value);
})

//Functions
function generateTableForChosenSevenDays(parentElement, getData, data, target, date) {
  let table = "<table>"
  const dates = date ? date : getLastSevenDays(new Date());
  dates.forEach(date => {
    table += `<tr><th>${getShortDate(date)}</th><td>${getData(data, target, getShortDate(date))}</td></tr>`
  })
  table += "</table>";
  parentElement.innerHTML = table;
}


//Renders the inner text of the table that stores all the user info.

function renderUser() {
  welcome.innerText = `Welcome ${displayUser.getFirstName()}!`
  userName.innerText = displayUser.name;
  userAddress.innerText = displayUser.address;
  userEmail.innerText = displayUser.email;
  userStride.innerText = displayUser.strideLength;
  userGoal.innerText = displayUser.dailyStepGoal;
  userFriends.innerText = displayUser.friends.map(friendID => repository.getUserData(friendID).getFirstName()).join(", ");
  averageAllSleep.innerText = repository.getAverageAllSleep(sleepData);
  avgHrsSleptPerday.innerText = displayUser.getSleepInfo(sleepData, 'hoursSlept')
  avgQualitySleep.innerText = displayUser.getSleepInfo(sleepData, 'sleepQuality')

  if (filterDate) {
    fluidOuncesDateHeader.innerText = `Fluid Ounces on ${getShortDate(filterDate)} :`;
    userDateFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData, getShortDate(filterDate));
    hrsSleptByDateHeader.innerText = `Hours Slept on ${getShortDate(filterDate)} :`;
    hrsSleptByDate.innerText = displayUser.getSleepInfo(sleepData, 'hoursSlept', getShortDate(filterDate));
    qualitySleepByDateHeader.innerText = `Quality Sleep on ${getShortDate(filterDate)} :`;
    qualitySleepByDate.innerText = displayUser.getSleepInfo(sleepData, 'sleepQuality', getShortDate(filterDate));
    hypersomnia.innerText = displayUser.getHypersomnia(sleepData, userData, getShortDate(filterDate)) || "No sleep data for any users on this day.";

    getActiveMinsOnDayHeader.innerText = `Minutes Active On ${getShortDate(filterDate)} :`;
    getActiveMinsOnDay.innerText = displayUser.getActiveMins(activityData, 'minutesActive', getShortDate(filterDate))
    checkStepGoal.innerText = displayUser.checkSteps(userData, activityData, 'dailyStepGoal', getShortDate(filterDate), displayUser.id)
  } else if (filterWeek) {
    fluidOuncesWeekHeader.innerText = `Average Fluid Ounces on week of ${getShortDate(filterWeek[0])} :`;
    console.log(filterWeek.map(date => getShortDate(date)));
    userAverageWeekFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData, filterWeek.map(date => getShortDate(date)));
    hrsSleptAcrossSevenDaysHeader.innerText = `Average Sleep Hours on week of ${getShortDate(filterWeek[0])} :`;
    hrsSleptAcrossSevenDays.innerText = displayUser.getSleepInfo(sleepData, "hoursSlept", filterWeek.map(date => getShortDate(date)));
    
    getActiveMinsOnWeekHeader.innerText = `Minutes Active on week of ${getShortDate(filterWeek[0])} :`;
   
  } else {
    userAverageFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData);
  }

  generateTableForChosenSevenDays(lastSevenWaterDays, displayUser.getAverageData.bind(displayUser), hydrationData, "numOunces", filterWeek);
  generateTableForChosenSevenDays(lastSevenSleepDays, displayUser.getAverageData.bind(displayUser), sleepData, "hoursSlept", filterWeek);
  generateTableForChosenSevenDays(lastSevenSleepQualityDays, displayUser.getAverageData.bind(displayUser), sleepData, "sleepQuality", filterWeek);
  lastSevenDaysBestSleeps.innerText =  repository.getArrayOfBestSleepersForSevenDays((filterWeek || []).map(date => getShortDate(date)), sleepData).join(" ");

  generateTableForChosenSevenDays(getActiveMinsOnWeek, displayUser.getAverageData.bind(displayUser), activityData, "minutesActive", filterWeek)
}


