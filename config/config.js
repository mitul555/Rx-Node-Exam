// this file for database connection

const Sequelize = require('sequelize'); //require file

//database connection
const sequelize = new Sequelize('node_exam', 'root', 'deep70', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;