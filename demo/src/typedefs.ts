export const typeDefs = `
  interface GeneralShow {
    id: ID!
    title: String!
    releaseYear: Int!
    episodes: [Episode!]!
    genre: Genre!
  }

  type Query {
    bestShow: Show!
    shows: [GeneralShow!]! # @authorize(policy: "ADMIN")
    showById(id: Int!): Show
    filterShowsByTitleAndReleaseYear(input: FilterShowsByTitleAndReleaseYearInput!): [Show!]!
    showsByGenre(genre: Genre!): [Show!]!
    episodes: [Episode!]!
    me: String!
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

  type Show implements GeneralShow {
    id: ID!
    title: String!
    releaseYear: Int!
    episodes: [Episode!]!
    genre: Genre!
    isLive: Boolean!
  }

  type StreamingShow implements GeneralShow {
    id: ID!
    title: String!
    releaseYear: Int!
    episodes: [Episode!]!
    genre: Genre!
    isInteractive: Boolean! # Black Mirror Bandersnatch
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
