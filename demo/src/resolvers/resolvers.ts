import { Episode } from "./episode-resolver.js";
import { Genre } from "./genre-resolver.js";
import { Mutation } from "./mutation-resolver.js";
import { Query } from "./query-resolver.js";
import { Show } from "./show-resolver.js";

export const resolvers = {
    Query,
    Mutation,
    Show,
    Episode,
    Genre
};