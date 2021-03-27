const User = require('../src/user.js')

class UserRepository {
  constructor() {
    this.allUsers = [];
  }

  generateUser(userData) {
    userData.forEach(user => this.allUsers.push(new User(user)));
  }

  

}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}