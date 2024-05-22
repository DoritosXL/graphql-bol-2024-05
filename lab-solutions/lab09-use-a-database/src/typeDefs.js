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

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput): User!
    deleteUser(input: DeleteUserInput): User!
    createBlog(input: CreateBlogInput!): Blog!
    publishBlog(input: PublishBlogInput!): Blog!
    deleteBlog(input: DeleteBlogInput!): DeleteBlogPayload!
  }

  type User {
    id: ID!
    firstname: String!
    email: String
    birthdate: String
    blogs: [Blog!]!
    comments: [Comment!]!
  }

  input CreateUserInput {
    firstname: String!
    email: String
    birthdate: String
  }

  input UpdateUserInput {
    id: ID!
    firstname: String
    email: String
    birthdate: String
  }

  input DeleteUserInput {
    id: ID!
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


  input CreateBlogInput {
    title: String!
    content: String!
    creatorID: ID!
  }

  input PublishBlogInput {
    id: ID!
    published: Boolean!
  }

  input DeleteBlogInput {
    id: ID!
  }

  type DeleteBlogPayload {
    blog: Blog
    errorMessage: String
  }

  type Comment {
    id: ID!
    content: String!
    blog: Blog!
    commentator: User!
  }
`;

export default typeDefs;
