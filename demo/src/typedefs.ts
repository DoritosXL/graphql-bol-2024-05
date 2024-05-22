export const typeDefs = `
  type Query {
    bestShow: Show!
    shows: [Show!]!
    showById(id: Int!): Show
    filterShowsByTitleAndReleaseYear(input: FilterShowsByTitleAndReleaseYearInput!): [Show!]!
    showsByGenre(genre: Genre!): [Show!]!
    episodes: [Episode!]!
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
    genre: Genre!
  }

  type Episode {
    id: ID!
    title: String!
    length: Int!
    showId: Int!
    show: Show!
  }

  enum Genre {
    HORROR
    THRILLER
    STALKING
  }
`;
