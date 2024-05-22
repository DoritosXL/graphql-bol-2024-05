import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    firstUser: User!
    users: [User!]!
    usersLimited(first: Int, last: Int): [User!]!
    usersByFirstName(namePart: String!): [User!]!
    blogs: [Blog!]!
    blogById(id: ID! = "b1"): Blog
    blogsByFilter(input: BlogsFilterInput): [Blog!]!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    firstname: String!
    email: String
    yearOfBirth: Int
    blogs: [Blog!]!
    comments: [Comment!]!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    creator: User!
    comments: [Comment!]!
  }

  input BlogsFilterInput {
    title: String
    content: String
    published: Boolean
  }

  type Comment {
    id: ID!
    content: String!
    blog: Blog!
    commentator: User!
  }
`;

export default typeDefs;
