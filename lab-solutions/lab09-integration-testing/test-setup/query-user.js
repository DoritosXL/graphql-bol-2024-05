import { gql } from 'apollo-server';

export default {
  GET_USERS: {
    query: gql`
      query getUsers {
        users {
          id
          firstname
          email
          birthdate
        }
      }
    `,
  },
  GET_USERS_WITH_BLOGS_AND_COMMENTS: {
    query: gql`
      query getUsersWithBlogsAndComments {
        users {
          id
          firstname
          blogs {
            title
          }
          comments {
            content
          }
        }
      }
    `,
  },
  GET_FIRST_USER: {
    query: gql`
      query getFirstUser {
        firstUser {
          id
          firstname
        }
      }
    `,
  },
  GET_FIRST_USER: {
    query: gql`
      query getFirstUser {
        firstUser {
          id
          firstname
        }
      }
    `,
  },
  GET_LIMITED_USERS_FAILURE1: {
    query: gql`
      query getLimitedUsersFailure1 {
        usersLimited(last: 2, first: 3) {
          id
          firstname
        }
      }
    `,
  },
  GET_LIMITED_USERS_FAILURE2: {
    query: gql`
      query getLimitedUsersFailure2 {
        usersLimited {
          id
          firstname
        }
      }
    `,
  },
  GET_LIMITED_USERS_SUCCESS1: {
    query: gql`
      query getLimitedUsersSuccess1 {
        usersLimited(last: 2) {
          id
          firstname
        }
      }
    `,
  },
  GET_LIMITED_USERS_SUCCESS2: {
    query: gql`
      query getLimitedUsersSuccess2 {
        usersLimited(first: 3) {
          id
          firstname
        }
      }
    `,
  },
  GET_USERS_BY_FIRSTNAME: {
    query: gql`
      query getUsersByFirstname {
        usersByFirstName(namePart: "ib") {
          id
          firstname
        }
      }
    `,
  },
};
