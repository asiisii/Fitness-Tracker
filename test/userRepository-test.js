const chai = require('chai')
const expect = chai.expect

const UserRepository = require('../src/userRepository')

describe('User Repository', () => {
  let userData, userRepository, userInfo
  
  beforeEach(() => {
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
    
    userRepository = new UserRepository(userInfo);
  })

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function')
  })

  it('should be an instance of User Repository', () => {
    userRepository.generateUser(userData);
    expect(userRepository).to.be.an.instanceOf(UserRepository)
  })

  it('should take in id and display user info', () => {
    userRepository.generateUser(userData) 

    expect(userRepository.getUserData(userData[0].id)).to.deep.equal(userData[0])
    expect(userRepository.getUserData(userData[1].id)).to.deep.equal(userData[1])
  })

})

