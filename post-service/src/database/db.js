const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('posts', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    port: '5433'
});

module.exports = sequelize