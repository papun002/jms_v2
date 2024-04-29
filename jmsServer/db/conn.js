const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('jms', 'postgres', '12345', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });

module.exports = sequelize;