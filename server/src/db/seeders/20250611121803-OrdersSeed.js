'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Orders', [
      {
        order_name: 'Пакет со сладким',
        img_path: 'https://avatars.mds.yandex.net/i?id=08b3db0427180d029130dc051106616e_l-5237743-images-thumbs&n=13',
        description: 'Самые сладкие',
        price: 1000,
        sale: 500,
        courier_id: 2,
        location: 'Москва, ул. Розы Сябитовой. 38'
      },
      {
        order_name: 'Пакет с не сладким',
        img_path: 'https://avatars.mds.yandex.net/i?id=bfe6b125b2c531537640a2115be53424_l-5545493-images-thumbs&n=13',
        description: 'Самые не сладкие',
        price: 500,
        sale: 250,
        courier_id: 3,
        location: 'Москва, ул. сына Розы Сябитовой. 38'
      },
      {
        order_name: 'Пакет с пакетами',
        img_path: 'Здесь будет фото',
        description: 'Самые крепкие',
        price: 700,
        sale: 350,
        courier_id: 2,
        location: 'Москва, ул. Петровка, 38'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
