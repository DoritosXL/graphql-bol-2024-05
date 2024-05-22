import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar EmailAddress
  scalar Date

  directive @upper on FIELD_DEFINITION
  directive @btw(percentage: Float!) on FIELD_DEFINITION

  type Query {
    """Return a list of publishable items: Blogs and Comments"""
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

  """Users can create blogs and/or comment on blogs"""
  type User {
    id: ID!
    firstname: String!
    email: EmailAddress @deprecated(reason: "Use field \`emailAddress\` instead.")
    emailAddress: EmailAddress
    birthdate: Date
    status: UserStatus!
    """Blogs created by the user"""
    blogs: [Blog!]!
    """Comments on blogs posted by the user"""
    comments: [Comment!]!
  }

  input CreateUserInput {
    firstname: String!
    email: EmailAddress @deprecated(reason: "Use field \`emailAddress\` instead.")
    emailAddress: EmailAddress
    birthdate: Date
  }

  input UpdateUserInput {
    id: ID!
    firstname: String
    email: EmailAddress @deprecated(reason: "Use field \`emailAddress\` instead.")
    emailAddress: EmailAddress
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
    title: String! @upper
    content: String!
    published: Boolean!
    price: Float @btw(percentage: 10)
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
    """New user is initially registered"""
    REGISTERED
    """User is active"""
    ACTIVE
    """User is temporary disabled"""
    DISABLED
    """User is expired, has left the company"""
    EXPIRED
  }
`;

export default typeDefs;
