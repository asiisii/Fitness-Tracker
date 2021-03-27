const User = require('../src/user.js')

class UserRepository {
  constructor() {
    this.allUsers = [];
  }

  generateUser(userData) {
    userData.forEach(user => this.allUsers.push(new User(user)));
  }

  getUserData(userID) {
    return this.allUsers.find(ele => ele.id === userID);
  }

}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}