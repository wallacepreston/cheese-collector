const {Board, Cheese} = require('../db');

exports.Query = {
  boards: (_, __, ___, {fieldNodes}) => {
    const fields = fieldNodes[0].selectionSet.selections;
    const selectFields = [];
    const include = [];
    for (const {name: {value: fieldName}} of fields) {
      selectFields.push(fieldName);
    }
    if(selectFields.includes('cheeses')) {
      include.push({
        model: Cheese
      })
    }
    return Board.findAll({include})
  },
}

exports.Mutation = {
  // (parent, arguments, context)
  createBoard: (_, data, __) => Board.create(data),
}
