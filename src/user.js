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
    let filteredArray = dataArray.filter(data => data.userID === this.id)

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

  getStepsByDate(activityData, userData, date, id) {
    const userStride = userData[id - 1].strideLength
    const userSteps = this.getAverageData(activityData, 'numSteps', date);
    let inMile = parseFloat(((userStride * userSteps) / 5280).toFixed(2))
    return inMile
  }

  getActiveMins(activityData, activityType, date) {
    return this.getAverageData(activityData, activityType, date);
  }

  checkSteps(userData, activityData, dailyStepGoal, date, id) {
    let totalWalked = this.getStepsByDate(activityData, userData, date, id) * 5280;
    let theirStepGoal = this.getAverageData(userData, dailyStepGoal, date);
    let remainingSteps = theirStepGoal - totalWalked;
    if (totalWalked >= theirStepGoal) {
      return 'Reached the daily step goal'
    } else {
      return `You still got ${remainingSteps} steps left`;
    }
  }

  // getStepGoalExceededDays(userData, activityData, dailyStepGoal, date, id) {
  //   const exceededDays = [];

  // }

  getTotalStairsClimbed(activityData) {
    let filteredArray = activityData.filter(data => data.userID === this.id)
    let stairsClimbed = filteredArray.map(stairs => stairs.flightsOfStairs)
    let climbingRecord = stairsClimbed.sort((a, b) => b - a)[0]
    return climbingRecord
  }

  getLatestDayInfo(activityData, activityType) {
    let filteredArray = activityData.filter(data => data.userID === this.id)
    let activityList = filteredArray.map(stairs => stairs[activityType])
    // let dateArray = filteredArray.map(stairs => stairs.date)
    // const latestDay = dateArray[dateArray.length - 1]
    const latestInfo = activityList[activityList.length - 1]
    return latestInfo
  }

  // getAvgLatestDayInfoForAllUsers(activityData, activityType) {
  //   const latestDay = activityData.map(user => user.date)[activityData.length - 1]
  //   const latestDayInfoList = activityData.filter(dates => dates.date === latestDay)
  //   const activity = latestDayInfoList.map(theActivity => theActivity[activityType])
  //   return (activity.reduce((total, stairs) => total += stairs)) / activity.length
  // }

  getStepGoalDates(activityData) {
    const stepGoal = this.dailyStepGoal;
    const filterArray = activityData.filter(user => user.userID === this.id);
    return filterArray.filter(user => user.numSteps > stepGoal).map(user => user.date);
  }

  getWeeklyActivityData(activityData, dates){
    return activityData.filter(user => user.userID === this.id && dates.some(date => user.date === date))
      .map(user => ({
        date: user.date,
        numSteps: user.numSteps,
        minutesActive: user.minutesActive,
        flightsOfStairs: user.flightsOfStairs,
      }));


  }

}


if (typeof module !== 'undefined') {
  module.exports = User;
}