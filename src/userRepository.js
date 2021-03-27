const User = require('../src/user.js')

class UserRepository {
  constructor() {
    this.allUsers = [];
  }

  generateUser(userData) {
    userData.forEach(user => this.allUsers.push(new User(user)));
  }

  getUserData(userID) {
    return this.allUsers.find(ele => ele.id === userID);
  }
  getAverageStep(inputArray, start) {
    const goals = [];
    for (var i = 0; i < inputArray.length; i++) {
      goals.push(inputArray[i].dailyStepGoal);
    }
    const average = goals.reduce((goal, start) => goal + start) / goals.length;
    return average;
  }

}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
