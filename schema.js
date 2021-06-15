const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    test: String,
    cheeses: [Cheese],
  }
  type Mutation {
    createCheese(title: String!, description: String!): Cheese
  }
  type Cheese {
    id: ID!
    title: String!
    description: String
  }
`;

module.exports = typeDefs;
