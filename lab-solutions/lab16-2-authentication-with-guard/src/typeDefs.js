import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User!]!
    serverTime: String!
  }

  type User {
    id: ID!
    username: String!
    city: String
  }
`;

export default typeDefs;
