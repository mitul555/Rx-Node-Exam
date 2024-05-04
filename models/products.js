//This file for add  user 


const Sequelize = require('sequelize');
const sequelize = require('../config/config');
let productType = ['0', '1'];
const Product = sequelize.define('products', {
  // Define your fields here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  product_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  product_image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
