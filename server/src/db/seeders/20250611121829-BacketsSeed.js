'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Backets', [
      {
        order_id: 1,
        buyer_id: 1
      },
      {
        order_id: 2,
        buyer_id: 1
      },
      {
        order_id: 4,
        buyer_id: 4
      },
      {
        order_id: 5,
        buyer_id: 4
      },
      {
        order_id: 6,
        buyer_id: 5
      },
      {
        order_id: 3,
        buyer_id: 1
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Backets', null, {});
  }
};
