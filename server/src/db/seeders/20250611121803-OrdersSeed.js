'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Orders', [
      {
        order_name: 'Пакет со сладким',
        img_path: 'Здесь будет фото',
        description: 'Самые сладкие',
        price: 1000,
        sale: 500,
        courier_id: 2,
        location: 'Москвка,ул. Розы Сябитовой. 38'
      },
      {
        order_name: 'Пакет с не сладким',
        img_path: 'Здесь будет фото',
        description: 'Самые не сладкие',
        price: 500,
        sale: 250,
        courier_id: 3,
        location: 'Москвка, ул. сына Розы Сябитовой. 38'
      },
      {
        order_name: 'Пакет с пакетами',
        img_path: 'Здесь будет фото',
        description: 'Самые крепкие',
        price: 700,
        sale: 350,
        courier_id: 2,
        location: 'Москвка, Петровка. 38'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
