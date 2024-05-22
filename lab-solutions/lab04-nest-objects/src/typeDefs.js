import { gql } from "apollo-server";

const typeDefs = gql`
  type Query { # root type
    firstUser: User!
    users: [User!]!
    blogs: [Blog!]!
  }

  type User {
    id: ID!
    firstname: String!
    email: String
    yearOfBirth: Int
    blogs: [Blog!]!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    creator: User!
  }
`;

export default typeDefs;