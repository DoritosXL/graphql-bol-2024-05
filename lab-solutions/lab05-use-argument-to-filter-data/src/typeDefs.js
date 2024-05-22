import { gql } from "apollo-server";

const typeDefs = gql`
  type Query { # root type
    firstUser: User!
    users: [User!]!
    usersByFirstName(namePart: String!): [User!]!
    usersLimited(first: Int, last: Int): [User!]!
    blogs: [Blog!]!
    blogById(id: ID! = "b1"): Blog
    blogsByFilter(input: BlogsFilterInput): [Blog!]!
  }

  input BlogsFilterInput {
    title: String
    content: String
    published: Boolean
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
