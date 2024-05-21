export const typeDefs = `
  type Query {
    bestShow: Show!
    shows: [Show!]!
    showById(id: Int!): Show
    filterShowsByTitleAndReleaseYear(input: FilterShowsByTitleAndReleaseYearInput!): [Show!]!
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
