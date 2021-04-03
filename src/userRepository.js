class UserRepository {
  constructor(userArray) {
    this.users = userArray;

  }

  getUserData(userID) {
    return this.users.find(user => user.id === userID);
  }

  getAverageStep() {
    if (!this.users || !this.users.length) {
      return 0;
    }
    return this.users.map(user => user.dailyStepGoal).reduce((total, stepgoal) => total += stepgoal) / this.users.length;
  }

  getAverageAllSleep(sleepData) {
    return sleepData.map(user => user.sleepQuality).reduce((total, quality) => total += quality) / sleepData.length;
  }

  getArrayOfBestSleepersForSevenDays (dates, data) {
    if (!dates) {
      return [];
    }
    const usersForWeek = data.filter(user => dates.some(date => date === user.date))
    const userSleepMap = {};
    usersForWeek.forEach(user => {
      if (!(user.userID in userSleepMap)) {
        userSleepMap[user.userID] = [user.sleepQuality]
      } else {
        userSleepMap[user.userID].push(user.sleepQuality);
      }
    })
    const weeklyUserAverageSleep = Object.keys(userSleepMap).map(userID => {
      return {
        userID,
        averageSleepForWeek: userSleepMap[userID].reduce((previousValue, currentValue) => previousValue + currentValue) / userSleepMap[userID].length,
      }
    });
    return weeklyUserAverageSleep.filter(user => user.averageSleepForWeek > 3).map(user => this.getUserData(Number(user.userID)).name)
  }

  getAvgActivityInfo(activityData, activityType, date) {
    const activityOnDate = activityData.filter(data => data.date === date)
    const acivityList = activityOnDate.map(user => user[activityType])
    return acivityList.reduce((total, activity) => total += activity) / acivityList.length
  }

}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
