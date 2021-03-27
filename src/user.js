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

  getAverageFluidOunces(hydrationData) {
    const hydration = hydrationData.filter(data => data.userID === this.id);
    return hydration.map(data => data.numOunces).reduce((total, current) => total + current) / hydration.length;
  }
}


if (typeof module !== 'undefined') {
  module.exports = User;
}