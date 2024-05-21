import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typedefs.js";
import { resolvers } from "./resolvers/query.js";
import { ShowRepository } from "./repositories/show-repository.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4500 },
  context: async ({ req }) => {
    return {
      showRepository: new ShowRepository()
    };
  }
});

console.log(`🚀  Server ready at: ${url}`);
