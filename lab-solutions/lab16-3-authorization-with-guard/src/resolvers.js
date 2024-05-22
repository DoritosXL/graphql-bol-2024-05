import { authenticated } from './authenticatedGuard.js';
import { authorized } from './authorizedGuard.js';

let sequence = 1;

const resolvers = {
  Query: {
    users: authenticated((_parent, _args, { db }) => db.users),
    serverTime: () => new Date().toISOString(),
  },
  Mutation: {
    createNote: authenticated(
      authorized('STUDENT')(
        (_parent, { content }, { db }) => {
          const note = { id: sequence++, content };
          db.notes.push(note);
          return note;
        }
      )
    ),
  }
}

export default resolvers;
