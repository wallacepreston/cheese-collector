const db = require('./db.js');

// register models
const models = require('./models/index.js');

for(let model in models) {
  db[model] = models[model];
}

db.Cheese.belongsToMany(db.Board, { through: 'Board_Cheese' });
db.Board.belongsToMany(db.Cheese, { through: 'Board_Cheese' });

module.exports = db;
