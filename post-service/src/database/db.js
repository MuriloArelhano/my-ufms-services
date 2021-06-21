const { Sequelize } = require('sequelize')
var config = require('../config/config.json')[process.env.NODE_ENV]

const sequelize = new Sequelize(config);

module.exports = sequelize