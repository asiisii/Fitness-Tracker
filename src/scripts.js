//Variables
const welcome = document.getElementById('welcome');
const userInfo = document.getElementById('userInfo');
const userName = document.getElementById('userName');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStride = document.getElementById('userStride');
const userGoal = document.getElementById('userGoal');
const userFriends = document.getElementById('userFriends');

const usersArray = userData.map(user => new User(user))
const repository = new UserRepository(usersArray);
let displayUser = repository.getUserData(1);

//EventListeners
window.addEventListener('DOMContentLoaded', (event) => {
  renderUser();
});

//Functions

function renderUser() {
  welcome.innerText = `Welcome ${displayUser.getFirstName()}!`
}

