//Variables
const welcome = document.getElementById('welcome');
const date = document.getElementById('date');
const week = document.getElementById('week');
const fluidOuncesDateHeader = document.getElementById('fluidOuncesDateHeader');
const userDateFluidOunces = document.getElementById('userDateFluidOunces');
const fluidOuncesWeekHeader = document.getElementById('fluidOuncesWeekHeader');
const userAverageWeekFluidOunces = document.getElementById('userAverageWeekFluidOunces');
const lastSevenWaterDays = document.getElementById('lastSevenWaterDays');
const hrsSleptAcrossSevenDaysHeader = document.getElementById('hrsSleptAcrossSevenDaysHeader');
const hrsSleptAcrossSevenDays = document.getElementById('hrsSleptAcrossSevenDays');
const weeklyActivityTrack = document.getElementById('weeklyActivityTrack');
const userDropBox = document.getElementById('userDropbox');
const myDailyStepGoal = document.getElementById('myDailyStepGoal')
const allUsersAvgStepGoal = document.getElementById('allUsersAvgStepGoal')
const myNumOfSteps =document.getElementById('myNumOfSteps')
const allUsersAvgSteps =document.getElementById('allUsersAvgSteps')
const myActiveMins =document.getElementById('myActiveMins')
const allUsersAvgActiveMins =document.getElementById('allUsersAvgActiveMins')
const myStairsClimbed =document.getElementById('myStairsClimbed')
const allUsersAvgStairsClimbed =document.getElementById('allUsersAvgStairsClimbed')
const avgHrsSleptPerday = document.getElementById('avgHrsSleptPerday')
const avgQualitySleep = document.getElementById('avgQualitySleep')
const hrsSleptByDateHeader = document.getElementById('hrsSleptByDateHeader')
const hrsSleptByDate = document.getElementById('hrsSleptByDate')
const qualitySleepByDateHeader = document.getElementById('qualitySleepByDateHeader')
const qualitySleepByDate = document.getElementById('qualitySleepByDate')
const lastestDayStepsInfo = document.getElementById('lastestDayStepsInfo')
const lastestDayActiveInfo = document.getElementById('lastestDayActiveInfo')
const lastestDistanceWalked = document.getElementById('lastestDistanceWalked')
const userName = document.getElementById('userName');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStride = document.getElementById('userStride');
const userGoal = document.getElementById('userGoal');
const userFriends = document.getElementById('userFriends');
const userAverageFluidOunces = document.getElementById('userAverageFluidOunces');

const usersArray = userData.map(user => new User(user))
const repository = new UserRepository(usersArray);

//---------------------Charts Variables Start----------------//
const stepGoalCompare = document.getElementById('stepGoalCompare')
const stepsCompare = document.getElementById('stepsCompare')
const minsActiveCompare = document.getElementById('minsActiveCompare')
const stairsClimbedCompare = document.getElementById('stairsClimbedCompare')

const allUserAvgNumSteps = repository.getAvgActivityInfo(activityData, 'numSteps', '2019/09/22')
const allUserAvgMinutesActive = repository.getAvgActivityInfo(activityData, 'minutesActive', '2019/09/22')
const allUserAvgFlightsOfStairs = repository.getAvgActivityInfo(activityData, 'flightsOfStairs', '2019/09/22')

let stepGoalChart = new Chart(stepGoalCompare, {})
let stepCompareChart = new Chart(stepsCompare, {})
let activeMinsCompareChart = new Chart(stairsClimbedCompare, {})
//---------------------Charts Variables End----------------//

let filterWeek = null;
let filterDate = null;
let displayUser = repository.getUserData(1);

//-------------------Event Listeners Start----------------//
window.addEventListener('DOMContentLoaded', (event) => {
  renderUserList();
  createCharts();
  renderUser();
  week.value = getWeek(new Date());
  date.value = getDate(new Date());
});

// The time is required because of the weird way that HTML and Javascript read a date.
date.addEventListener('change', (event) => {
  filterDate = new Date(date.value + ':0:0:0');
  filterWeek = null;
  createCharts();
  renderUser();
  date.value = getDate(new Date());
})

week.addEventListener('change', (event) => {
  filterWeek = getDatesOfWeek(getDateForWeek(week.value));
  filterDate = null;
  createCharts();
  renderUser();
  week.value = getWeek(new Date());
})

userDropbox.addEventListener('change', (event) => {
  displayUser = repository.getUserData(Number(userDropbox.value));
  createCharts();
  renderUser();
})
//-------------------Event Listeners End----------------//

//-------------------Functions Start-------------------//
function generateTableForChosenSevenDays(parentElement, getData, data, target, date) {
  let table = "<table>"
  const dates = date ? date : getLastSevenDays(new Date());
  dates.forEach(date => {
    table += `<tr><th>${getShortDate(date)}:</th><td>${getData(data, target, getShortDate(date))}</td></tr>`
  })
  table += "</table>";
  parentElement.innerHTML = table;
}

function renderUserList() {
  let options = "";
  repository.users.forEach(user => {
    options += `<option value="${user.id}">${user.name}</option>`;
  });
  userDropBox.innerHTML = options;
}

//Renders the inner text of the table that stores all the user info.
function renderUser() {
  welcome.innerText = `Welcome, ${displayUser.getFirstName()}!`
  userName.innerText = displayUser.name;
  userAddress.innerText = displayUser.address;
  userEmail.innerText = displayUser.email;
  userStride.innerText = displayUser.strideLength;
  userGoal.innerText = displayUser.dailyStepGoal;
  userFriends.innerText = displayUser.friends.map(friendID => repository.getUserData(friendID).getFirstName()).join(", ");
  myDailyStepGoal.innerText = displayUser.dailyStepGoal
  allUsersAvgStepGoal.innerText = repository.getAverageStep()
  myNumOfSteps.innerText = displayUser.getLatestDayInfo(activityData, 'numSteps')
  allUsersAvgSteps.innerText = repository.getAvgActivityInfo(activityData, 'numSteps', '2019/09/22')
  myActiveMins.innerText = displayUser.getLatestDayInfo(activityData, 'minutesActive')
  allUsersAvgActiveMins.innerText = repository.getAvgActivityInfo(activityData, 'minutesActive', '2019/09/22')
  myStairsClimbed.innerText = displayUser.getLatestDayInfo(activityData, 'flightsOfStairs')
  allUsersAvgStairsClimbed.innerText = repository.getAvgActivityInfo(activityData, 'flightsOfStairs', '2019/09/22')
  avgHrsSleptPerday.innerText = displayUser.getSleepInfo(sleepData, 'hoursSlept').toFixed(2)
  avgQualitySleep.innerText = displayUser.getSleepInfo(sleepData, 'sleepQuality').toFixed(2)
  lastestDayStepsInfo.innerText = displayUser.getLatestDayInfo(activityData, 'numSteps');
  lastestDayActiveInfo.innerText = displayUser.getLatestDayInfo(activityData, 'minutesActive');
  lastestDistanceWalked.innerText = (((displayUser.getLatestDayInfo(activityData, 'numSteps')) * displayUser.strideLength) / 5280).toFixed(2)

  if (filterDate) {
    fluidOuncesDateHeader.innerText = `Fluid Ounces on ${getShortDate(filterDate)} :`;
    userDateFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData, getShortDate(filterDate));
    hrsSleptByDateHeader.innerText = `Hours Slept on ${getShortDate(filterDate)} :`;
    hrsSleptByDate.innerText = displayUser.getSleepInfo(sleepData, 'hoursSlept', getShortDate(filterDate));
    qualitySleepByDateHeader.innerText = `Quality Sleep on ${getShortDate(filterDate)} :`;
    qualitySleepByDate.innerText = displayUser.getSleepInfo(sleepData, 'sleepQuality', getShortDate(filterDate));
  } else if (filterWeek) {
    fluidOuncesWeekHeader.innerText = `Average Fluid Ounces on week of ${getShortDate(filterWeek[0])} :`;
    userAverageWeekFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData, filterWeek.map(date => getShortDate(date)));
    hrsSleptAcrossSevenDaysHeader.innerText = `Average Sleep Hours on week of ${getShortDate(filterWeek[0])} :`;
    hrsSleptAcrossSevenDays.innerText = displayUser.getSleepInfo(sleepData, "hoursSlept", filterWeek.map(date => getShortDate(date))).toFixed(2);
    weeklyActivityTrack.innerText = JSON.stringify(displayUser.getWeeklyActivityData(activityData, filterWeek.map(date => getShortDate(date))));
  } else {
    userAverageFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData);
  }

  generateTableForChosenSevenDays(lastSevenWaterDays, displayUser.getAverageData.bind(displayUser), hydrationData, "numOunces", filterWeek);
}

