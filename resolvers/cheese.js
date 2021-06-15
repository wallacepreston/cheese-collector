const Cheese = require('../db/models/cheese');

exports.Query = {
  cheeses: (_, __) => Cheese.findAll(),
}

exports.Mutation = {
  createCheese: (_, data, __) => Cheese.create(data),
}