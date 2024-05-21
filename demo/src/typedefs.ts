export const typeDefs = `
  type Query {
    bestShow: Show!
    shows: [Show!]!
    showById(id: Int!): Show
    filterShowsByTitleAndReleaseYear(input: FilterShowsByTitleAndReleaseYearInput!): [Show!]!
  }

  type Mutation {
    addShow(input: AddShowInput!): Show!
  }

  input AddShowInput {
    title: String!
    releaseYear: Int!
  }

  input FilterShowsByTitleAndReleaseYearInput {
    title: String
    releaseYear: Int
  }

  type Show {
    id: ID!
    title: String!
    releaseYear: Int!
    episodes: [Episode!]!
  }

  type Episode {
    id: ID!
    title: String!
    length: Int!
    showId: Int!
    show: Show!
  }
`;
