import { GraphQLScalarType, Kind } from 'graphql';

const pattern =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const description = `
  Uses validation as defined in:
  https://html.spec.whatwg.org/
`;

const emailAddress = new GraphQLScalarType({
  name: 'EmailAddress',
  description,
  serialize(value) {
    return value;
  },
  parseValue(value) {
    if (typeof value === 'string' && pattern.test(value)) {
      return value;
    }
    throw new Error('invalid email address!');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && pattern.test(ast.value)) {
      return ast.value;
    }
    throw new Error('invalid email address!');
  },
});

export default emailAddress;