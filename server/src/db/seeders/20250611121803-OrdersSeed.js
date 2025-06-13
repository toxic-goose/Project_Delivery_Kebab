'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Orders', [
      {
        order_name: 'Шоколадки в ассортименте',
        img_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_tIOPgmRS2CqLdy6KaDdUnXIzGrwNqNjprRfwLE-Pgz-l9_nt1xet7dNqu9ZHF4icgxA&usqp=CAU',
        description: 'Самые сладкие',
        price: 1560,
        sale: 780,
        courier_id: 2,
        location: 'Москва, ул. Розы Сябитовой, 69'
      },
      {
        order_name: 'Пакет с не сладким',
        img_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSonmxINYDFyd5WNkPqCUoNX2h0VBFsgr_Opw&s',
        description: 'Для Михаила Черничкина',
        price: 500,
        sale: 250,
        courier_id: 3,
        location: 'Москва, ул. Зорге, 12'
      },
      {
        order_name: 'Пакет с пакетами',
        img_path: 'https://whitepack.ru/upload/iblock/8ea/k3ghn42o07ra70cax29n2lshhqh7js50.jpg',
        description: 'Самые крепкие',
        price: 700,
        sale: 350,
        courier_id: 2,
        location: 'Санкт-Петербург, ул. Садовая, 20'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
