const chai = require('chai')
const expect = chai.expect

const User = require('../src/user.js')

describe('User', () => {
  let userData, user1, user2

  beforeEach(() => {
    hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
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
    expect(user1.getAverageFluidOunces(hydrationData, "2019/06/15")).to.deep.equal(37);

  })


})
