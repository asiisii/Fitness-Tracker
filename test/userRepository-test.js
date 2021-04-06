const chai = require('chai')
const expect = chai.expect

const UserRepository = require('../src/userRepository')
const User = require('../src/user')

describe('User Repository', () => {
  let sleepData, activityData, userData, usersArray, userRepository

  beforeEach(() => {
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
    usersArray = userData.map(user => new User(user));
    userRepository = new UserRepository(usersArray);
  })

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function')
  })

  it('should return an object using user ID', () => {
    expect(userRepository.getUserData(1)).to.deep.equal(userData[0])
  })

  it('should produce an average step count', () => {
    expect(userRepository.getAverageStep()).to.deep.equal(7500)
  })

  it('should produce an average sleep among all users', () => {
    expect(userRepository.getAverageAllSleep(sleepData)).to.deep.equal(3.45)
  })

})
