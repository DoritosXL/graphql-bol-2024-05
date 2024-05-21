export const typeDefs = `
  type Show {
    title: String!
    releaseYear: Int!
  }

  type Query {
    bestShow: Show!
  }
`;
