const Sequelize = require('sequelize');
const db = require('../db.js');

const Board = db.define('board', {
  type: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Board;
