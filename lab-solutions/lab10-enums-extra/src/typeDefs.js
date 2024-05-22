import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput): User!
    changeUserStatus(input: ChangeUserStatusInput!): User!
    deleteUser(input: DeleteUserInput): User!
    
  }

  type Subscription {
    userModified: UserModificationPayload!
  }

  type User {
    id: ID!
    firstname: String!
    email: String
    birthdate: String
    status: UserStatus!
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

  input ChangeUserStatusInput {
    id: ID!
    status: UserStatus!
  }

  input DeleteUserInput {
    id: ID!
  }

  type UserModificationPayload {
    user: User!
    modification: UserModification!
  }

  enum UserStatus {
    REGISTERED
    ACTIVE
    DISABLED
    EXPIRED
  }

  enum UserModification {
    CREATED
    UPDATED
    STATUSCHANGED
    DELETED
  }
`;

export default typeDefs;
