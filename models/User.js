//This file for add  user 


const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('user', {
  // Define your fields here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
