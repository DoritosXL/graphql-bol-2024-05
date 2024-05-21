export const typeDefs = `
  type Query {
    bestShow: Show!
    shows: [Show!]!
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
  }
`;
