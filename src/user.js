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

  getAverageData (dataArray, targetData, date) {
    let filteredArray = dataArray.filter(data => {
      // console.log(this.id);
      return data.userID === this.id
    })
    
    if (typeof date === "string") {
      filteredArray = filteredArray.filter(data => data.date === date);
      if (!filteredArray.length) {
        return 0;
      }
    } else if (date instanceof Array) {
      // Some see if ANY thing in the array see if the data equals the data date.
      filteredArray = filteredArray.filter(data => date.some(date => data.date === date));
      if (!filteredArray.length) {
        return 0;
      }
    }
    
    return filteredArray.map(data => data[targetData]).reduce((total, current) => total + current) / filteredArray.length;
  }

  getAverageFluidOunces(hydrationData, date) {
    return this.getAverageData(hydrationData, "numOunces", date);
  }

  getSleepInfo(sleepData, sleepType, date) {
    return this.getAverageData(sleepData, sleepType, date);
  }

  getHypersomnia(sleepData, userData, day) {
    let userSleepData = sleepData.filter(user => user.date === day);
    let getHrs = userSleepData.map(user => user.hoursSlept);
    let highestHrs = getHrs.sort((a, b) => b - a)[0];
    let filteredUsersSleepData = userSleepData.filter(user => user.hoursSlept === highestHrs);
    if (!filteredUsersSleepData.length) {
      return
    }
    let idOfSomnia = filteredUsersSleepData[0].userID;
    let somniaName = userData.filter(user => user.id === idOfSomnia)[0].name;
    return somniaName;
  }

  getActiveMins(activityData, activityType, date) {
    return this.getAverageData(activityData, activityType, date);
  }

}


if (typeof module !== 'undefined') {
  module.exports = User;
}