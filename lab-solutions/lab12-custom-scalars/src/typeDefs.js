import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar EmailAddress
  scalar Date

  type Query {
    items: [Publishable!]!
    firstUser: User!
    users: [User!]!
    usersLimited(first: Int, last: Int): [User!]!
    usersByFirstName(namePart: String!): [User!]!
    usersByStatus(status: UserStatus!): [User!]!
    blogs: [Blog!]!
    blogById(id: ID! = "b1"): BlogResult!
    blogsByFilter(input: BlogsFilterInput): [Blog!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput): User!
    changeUserStatus(input: ChangeUserStatusInput!): User!
    deleteUser(input: DeleteUserInput): User!
    createBlog(input: CreateBlogInput!): Blog!
    publishBlog(input: PublishBlogInput!): Blog!
    deleteBlog(input: DeleteBlogInput!): DeleteBlogPayload!
  }

  type User {
    id: ID!
    firstname: String!
    email: EmailAddress
    birthdate: Date
    status: UserStatus!
    blogs: [Blog!]!
    comments: [Comment!]!
  }

  input CreateUserInput {
    firstname: String!
    email: EmailAddress
    birthdate: Date
  }

  input UpdateUserInput {
    id: ID!
    firstname: String
    email: EmailAddress
    birthdate: Date
  }

  input ChangeUserStatusInput {
    id: ID!
    status: UserStatus!
  }

  input DeleteUserInput {
    id: ID!
  }

  type Blog implements Publishable {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    price: Float
    availableDate: Date
    availableInCountry: Boolean
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

  type Comment implements Publishable {
    id: ID!
    content: String!
    published: Boolean!
    blog: Blog!
    commentator: User!
  }

  type Country {
    id: ID!
    name: String!
  }

  interface Publishable {
    published: Boolean!
  }

  type NotAvailableYet {
    availableDate: Date!
  }

  type NotAvailableInCountry {
    availableInCountries: [Country!]!
  }

  union BlogResult = Blog | NotAvailableYet | NotAvailableInCountry

  enum UserStatus {
    REGISTERED
    ACTIVE
    DISABLED
    EXPIRED
  }
`;

export default typeDefs;
