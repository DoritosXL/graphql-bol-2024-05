import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User!]!
    serverTime: String!
  }

  type Mutation {
    createNote(content: String!): Note!
  }

  type User {
    id: ID!
    username: String!
    city: String
  }

  type Note {
    id: ID!
    content: String!
  }
`;

export default typeDefs;
