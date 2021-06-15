const cheeseResolver = require('./resolvers/cheese');

module.exports = {
  Query: {
    test: () => {
      return 'Hello World';
    },
    ...cheeseResolver.Query,
  },
  Mutation: {
    ...cheeseResolver.Mutation,
  }

};