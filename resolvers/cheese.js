const {Cheese} = require('../db');

exports.Query = {
  cheeses: async (_, {pageSize = 5, page}) => {
    const {count, rows: cheeses} = await Cheese.findAndCountAll({
      limit: pageSize,
      offset: page ? (page - 1) * pageSize : 1,
    });
    return {
      cheeses,
      total: count
    }
  }
}

exports.Mutation = {
  // (parent, arguments, context)
  createCheese: (_, data, __) => Cheese.create(data),
}
