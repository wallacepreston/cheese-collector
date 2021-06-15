const {cheese, board} = require('./resolvers/index');
const {location} = require('./resolvers/index');

module.exports = {
  Query: {
    test: () => {
      return 'Hello World';
    },
    ...location.Query,
    ...cheese.Query,
    ...board.Query,
  },
  Mutation: {
    ...cheese.Mutation,
    ...board.Mutation,
  }
};