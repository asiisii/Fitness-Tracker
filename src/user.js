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
    if(typeof date === "string") {
      hydration = hydration.filter(data => data.date === date);
      if(!hydration.length) {
        return 0;
      }
    } else if (date instanceof Array) {
      // Some see if ANY thing in the array see if the data equals the data date.
      hydration = hydration.filter(data => date.some(date => data.date === date));
      if(!hydration.length) {
        return 0;
      }
    }
    return hydration.map(data => data.numOunces).reduce((total, current) => total + current) / hydration.length;
  }
}


if (typeof module !== 'undefined') {
  module.exports = User;
}