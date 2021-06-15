const Sequelize = require('sequelize');
const db = require('../db.js');

const Cheese = db.define('cheese', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Cheese;
