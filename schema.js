const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    test: String,
    boards: [Board],
    location: Location,
    cheeses(
      pageSize: Int
      page: Int
    ): CheeseConnection!
  }
  type Mutation {
    createCheese(title: String!, description: String!): Cheese
    createBoard(title: String!, description: String!): Board
  }
  type Cheese {
    id: ID!
    title: String
    description: String
    createdAt: String
  }
  type Board {
    id: ID!
    type: String!
    description: String
    rating: Int
    createdAt: String
    cheeses: [Cheese]
  }
  type Location {
    city: String
  }
  type CheeseConnection {
    cheeses: [Cheese]!
    total: Int!
  }
  `;

module.exports = typeDefs;
