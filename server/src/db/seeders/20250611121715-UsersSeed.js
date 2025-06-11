'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users', [
      {
        user_name: 'Alena',
        email: 'alena@mail.com',
        phone: '89376403344',
        password: 'Qwerty123!',
        is_buyer: true
      },
      {
        user_name: 'Vova',
        email: 'vova@mail.com',
        phone: '89658903456',
        password: 'Qwerty123!',
        is_buyer: false
      },
      {
        user_name: 'Denis',
        email: 'denis@mail.com',
        phone: '89801112233',
        password: 'Qwerty123!',
        is_buyer: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});
  }
};
