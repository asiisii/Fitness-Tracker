//Variables
const welcome = document.getElementById('welcome');
const date = document.getElementById('date');
const week = document.getElementById('week');
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
let displayUser = repository.getUserData(1);

//EventListeners
window.addEventListener('DOMContentLoaded', (event) => {
  renderUser();
  week.value = getWeek(new Date());
  date.value = getDate(new Date());
});

//Functions

function renderUser() {
  welcome.innerText = `Welcome ${displayUser.getFirstName()}!`
  userName.innerText = displayUser.name;
  userAddress.innerText = displayUser.address;
  userEmail.innerText = displayUser.email;
  userStride.innerText = displayUser.strideLength;
  userGoal.innerText = displayUser.dailyStepGoal;
  userFriends.innerText = displayUser.friends.map(friendID => repository.getUserData(friendID).getFirstName()).join(", ");
  userAverageFluidOunces.innerText = displayUser.getAverageFluidOunces(hydrationData);
}

function getDate(date) {
  return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
}

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