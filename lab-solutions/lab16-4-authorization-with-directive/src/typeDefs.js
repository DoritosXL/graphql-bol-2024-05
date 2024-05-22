import { gql } from 'apollo-server';

const typeDefs = gql`
  directive @auth(requires: Role) on FIELD_DEFINITION

  enum Role {
    ADMIN
    STUDENT
  }

  type Query {
    users: [User!]! @auth(requires: ADMIN)
    serverTime: String!
  }

  type Mutation {
    createNote(content: String!): Note! @auth(requires: STUDENT)
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
