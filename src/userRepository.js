class UserRepository {
  constructor(userArray) {
    this.users = userArray;

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
  
  getAverageAllSleep() {
    return sleepData.map(user => user.hoursSlept).reduce((total, sleep) => total += sleep) / sleepData.length;
  }

}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
