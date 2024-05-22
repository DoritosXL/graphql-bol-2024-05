import { gql } from 'apollo-server';

export default {
  GET_COMMENTS: {
    query: gql`
      query getComments {
        comments {
          id
          content
        }
      }
    `,
  },
  GET_COMMENTS_WITH_BLOG_AND_COMMENTATOR: {
    query: gql`
      query getCommentsWithBlogAndCommentator {
        comments {
          id
          content
          blog {
            content
          }
          commentator {
            firstname
          }
        }
      }
    `,
  },
};
