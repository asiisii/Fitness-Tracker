const User = require('../src/user.js')

class UserRepository {
  constructor(userData) {
    this.users = [];
    userData.forEach(user => this.users.push(new User(user)));
  }

  getUserData(userID) {
    return this.users.find(user => user.id === userID);
  }
  getAverageStep() {
    if(!this.users || !this.users.length) {
      return 0;
    }
    return this.users.map(user => user.dailyStepGoal).reduce((total, stepgoal) => total += stepgoal) / this.users.length;
  }

}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
