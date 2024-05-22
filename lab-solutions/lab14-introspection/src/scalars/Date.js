import { GraphQLScalarType, Kind } from 'graphql';

const description = 'Expected Format: YYYY-MM-DD';

function validDate(input) {
  const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!pattern.test(input)) {
    return false;
  }
  const date = new Date(input);
  return input === date.toISOString().split('T')[0];
}

const date = new GraphQLScalarType({
  name: 'Date',
  description,
  serialize(value) {
    const dt = new Date(value);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dt.toLocaleString('nl-NL', options);
  },
  parseValue(value) {
    if (typeof value === 'string' && validDate(value)) {
      return value;
    }
    throw new Error('invalid date, expected format: YYYY-MM-DD');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && validDate(ast.value)) {
      return ast.value;
    }
    throw new Error('invalid date, expected format: YYYY-MM-DD');
  },
});

export default date;
