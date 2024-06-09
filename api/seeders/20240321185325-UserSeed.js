'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [
      {
        name:'Clara',
        email:'clara@test.com',
        username: 'clara',
        password: await bcrypt.hash('1234', 10),
        role: 0
      },
      {
        name:'Bob',
        email:'bob@test.com',
        username:'bob',
        password: await bcrypt.hash('1234', 10),
        role: 1
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
