//Variables
const welcome = document.getElementById('welcome');

const usersArray = userData.map(user => new User(user))
const repository = new UserRepository(usersArray);
let displayUser = repository.getUserData(1);

//EventListeners
window.addEventListener('DOMContentLoaded', (event) => {
  welcome.innerText = `Welcome ${displayUser.getFirstName()}!`
});

//Functions



