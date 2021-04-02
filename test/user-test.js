const chai = require('chai')
const expect = chai.expect

const User = require('../src/user.js')

describe('User', () => {
  let userData, hydrationData, sleepData, activityData, user, user1, user2

  beforeEach(() => {
    hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 75
      }
    ]
    sleepData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "hoursSlept": 7,
        "sleepQuality": 4.7
      }
    ]
    activityData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      }
    ]
    userData = [
      {
        "id": 1,
        "name": "Luisa Hane",
        "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        "email": "Diana.Hayes1@hotmail.com",
        "strideLength": 4.3,
        "dailyStepGoal": 10000,
        "friends": [ 16, 4, 8 ]
      },
      {
        "id": 2,
        "name": "Jarvis Considine",
        "address": "30086 Kathryn Port, Ciceroland NE 07273",
        "email": "Dimitri.Bechtelar11@gmail.com",
        "strideLength": 4.5,
        "dailyStepGoal": 5000,
        "friends": [ 9, 18, 24, 19 ]
      },
    ]
    const displayUser = 1
    user = new User(userData)
    user1 = new User(userData[0])
    user2 = new User(userData[1])
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should be an instance of User Repository', () => {
    expect(user1).to.be.an.instanceof(User)
  })

  it('should have an id', () => {
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  })

  it('should have an name', () => {
    expect(user1.name).to.equal('Luisa Hane');
    expect(user2.name).to.equal('Jarvis Considine');
  })

  it('should have an address', () => {
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user2.address).to.equal('30086 Kathryn Port, Ciceroland NE 07273');
  })

  it('should have an email', () => {
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user2.email).to.equal('Dimitri.Bechtelar11@gmail.com');
  })

  it('should have an strideLength', () => {
    expect(user1.strideLength).to.equal(4.3);
    expect(user2.strideLength).to.equal(4.5);
  })

  it('should have an dailyStepGoal', () => {
    expect(user1.dailyStepGoal).to.equal(10000);
    expect(user2.dailyStepGoal).to.equal(5000);
  })

  it('should have an friends', () => {
    expect(user1.friends).to.deep.equal([ 16, 4, 8 ]);
    expect(user2.friends).to.deep.equal([ 9, 18, 24, 19 ]);
  })

  it('should return user\'s first name only', () => {
    expect(user1.getFirstName()).to.equal('Luisa')
    expect(user2.getFirstName()).to.equal('Jarvis')
  })

  it('should return a users average fluid ounces', () => {
    // expect(user1.getAverageFluidOunces(hydrationData, "2019/06/15")).to.deep.equal(37);
    expect(user.getAverageFluidOunces(hydrationData, "2019/06/15")).to.deep.equal(56);
  })

  it('should return a users slept hrs', () => {
    expect(user1.getSleepInfo(sleepData, "hoursSlept", "2019/06/15")).to.equal(6.1);
    expect(user2.getSleepInfo(sleepData, "hoursSlept", "2019/06/15")).to.equal(7);
  })

  it('should return a users quality sleep', () => {
    expect(user1.getSleepInfo(sleepData, "sleepQuality", "2019/06/15")).to.equal(2.2);
    expect(user2.getSleepInfo(sleepData, "sleepQuality", "2019/06/15")).to.equal(4.7);
  })

  it('should return a user who slept the most', () => {
    expect(user.getHypersomnia(sleepData, userData, "2019/06/15")).to.equal('Jarvis Considine')
  })

  it.only('should return a users active mins', () => {
    expect(user1.getStepsByDate(activityData, userData, "2019/06/15", 1)).to.equal(3);
  })
  
  it('should return a users active mins', () => {
    expect(user1.getSleepInfo(activityData, "minutesActive", "2019/06/15")).to.equal(140);
    expect(user2.getSleepInfo(activityData, "minutesActive", "2019/06/15")).to.equal(138);
  })

})
