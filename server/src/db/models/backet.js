'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Backet extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'Order' })
      this.belongsTo(models.User, {foreignKey:'buyer_id'})
      
    }
  }
  Backet.init({
    order_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Backet',
  });
  return Backet;
};