import { shows } from "../data/shows.js";

export const resolvers = {
  Query: {
    bestShow: () => shows[0],
  },
};
