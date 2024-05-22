import { gql } from "apollo-server";

const typeDefs = gql`
  type Query { # root type
    firstUser: User!
  }

  type User {
    id: ID!
    firstname: String!
    email: String
    yearOfBirth: Int
  }
`;

export default typeDefs;