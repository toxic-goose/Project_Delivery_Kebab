'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    this.hasMany(models.Order, {foreignKey:'courier_id'})
    this.hasMany(models.Backet, {foreignKey:'buyer_id'})
    }
  }
  User.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    is_buyer: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};