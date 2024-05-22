import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User!]!
    blogs: [Blog!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput): User!
    createBlog(input: CreateBlogInput!): Blog!
  }

  type Subscription {
    userCreated: User!
    userUpdated(userID: ID!): User!
    blogCreated(userID: ID!): Blog!
  }

  type User {
    id: ID!
    firstname: String!
    email: String
    yearOfBirth: Int
    blogs: [Blog!]!
  }

  input CreateUserInput {
    firstname: String!
    email: String
    yearOfBirth: Int
  }

  input UpdateUserInput {
    id: ID!
    firstname: String
    email: String
    yearOfBirth: Int
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    creator: User!
  }

  input CreateBlogInput {
    title: String!
    content: String!
    creatorID: ID!
  }
`;

export default typeDefs;
