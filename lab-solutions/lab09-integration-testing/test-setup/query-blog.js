import { gql } from 'apollo-server';

export default {
  GET_BLOGS: {
    query: gql`
      query getBlogs {
        blogs {
          id
          title
          content
          published
        }
      }
    `,
  },
  GET_BLOGS_WITH_COMMENTS: {
    query: gql`
      query getBlogsWithComments {
        blogs {
          id
          title
          content
          published
          comments {
            id
            content
          }
        }
      }
    `,
  },
  GET_BLOGS_WITH_CREATOR_AND_COMMENTS: {
    query: gql`
      query getBlogsWithCreatorAndComments {
        blogs {
          id
          title
          creator {
            firstname
          }
          comments {
            content
          }
        }
      }
    `,
  },
  GET_BLOG_BY_ID: {
    query: gql`
      query getBlogById {
        blogById(id: 3) {
          id
          title
          content
        }
      }
    `,
  },
  GET_BLOGS_BY_FILTER: {
    query: gql`
      query getBlogByFilter($input: BlogsFilterInput!) {
          blogsByFilter(input: $input) {
            id
            title
            content
          }
        }
    `,
    variables: {
      input: {
        title: 'C',
        content: 'g',
        published: false
      }
    }
  },
};
