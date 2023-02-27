const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
});


module.exports = Role;