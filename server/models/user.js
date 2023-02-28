const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./role');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id',
    },
  }
});

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });


module.exports = User;
