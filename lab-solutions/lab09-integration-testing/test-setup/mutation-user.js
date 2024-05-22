import { gql } from 'apollo-server';

export default {
  CREATE_USER: {
    query: gql`
      mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          firstname
          email
          birthdate
        }
      }
    `,
    variables: {
      input: {
        firstname: 'Joop',
        email: 'joop@alfa.com',
        birthdate: '2001-04-04',
      },
    },
  },
  UPDATE_USER: {
    query: gql`
      mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          id
          email
          firstname
          birthdate
        }
      }
    `,
    variables: {
      input: {
        id: 1,
        firstname: 'Joop',
        email: 'joop@alfa.com',
        birthdate: '2001-04-04',
      },
    },
  },
  DELETE_USER: {
    query: gql`
      mutation deleteUser($input: DeleteUserInput!) {
        deleteUser(input: $input) {
          id
          email
          firstname
          birthdate
        }
      }
    `,
    variables: {
      input: {
        id: 6,
      },
    },
  },
};
