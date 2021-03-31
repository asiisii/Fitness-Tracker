class User {
  constructor(userData) {
    this.id = userData.id
    this.name = userData.name
    this.address = userData.address
    this.email = userData.email
    this.strideLength = userData.strideLength
    this.dailyStepGoal = userData.dailyStepGoal
    this.friends = userData.friends
  }

  getFirstName() {
    return this.name.split(' ')[0];
  }

  getAverageFluidOunces(hydrationData, date) {
    let hydration = hydrationData.filter(data => data.userID === this.id);
    if (typeof date === "string") {
      hydration = hydration.filter(data => data.date === date);
      if (!hydration.length) {
        return 0;
      }
    } else if (date instanceof Array) {
      // Some see if ANY thing in the array see if the data equals the data date.
      hydration = hydration.filter(data => date.some(date => data.date === date));
      if (!hydration.length) {
        return 0;
      }
    }
    return hydration.map(data => data.numOunces).reduce((total, current) => total + current) / hydration.length;
  }

  getAvgSleepInfo(sleepData, sleepType) {
    let userSleepData = sleepData.filter(user => user.userID === this.id);
    let sleptHrs = userSleepData.map(hour => hour[sleepType]);
    return sleptHrs.reduce((total, time) => total += time) / userSleepData.length; 
  }

  getSleepInfoByDate(sleepData, date, sleepType) {
    let userSleepData = sleepData.filter(user => user.userID === this.id);
    return userSleepData.filter(day => day.date === date)[0][sleepType]
  }

  findHpyersomnia(day) {
    let userSleepData = sleepData.filter(user => user.date === day)
    let getHrs = userSleepData.map(user => user.hoursSlept)
    // console.log('getHrs', getHrs);
    let highestHrs = getHrs.sort((a, b) => b - a)[0];
    // console.log('highestHrs');
    let idOfSomnia = userSleepData.filter(user => user.hoursSlept === highestHrs)[0].userID
    // console.log(idOfSomnia);
    let somniaName = userData.filter(user => user.id === idOfSomnia)[0].name
    console.log(somniaName);
    return somniaName
  }

}


if (typeof module !== 'undefined') {
  module.exports = User;
}