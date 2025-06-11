'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.hasMany(models.Backet, {foreignKey:'order_id'}) 
    }
  }
  Order.init({
    order_name: DataTypes.STRING,
    img_path: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    sale: DataTypes.INTEGER,
    courier_id: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};