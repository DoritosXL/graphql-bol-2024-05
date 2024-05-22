import { gql } from 'apollo-server';

export default {
  CREATE_BLOG: {
    query: gql`
      mutation createBlog($input: CreateBlogInput!) {
        createBlog(input: $input) {
          title
          content
          creator {
            email
          }
          published
        }
      }
    `,
    variables: {
      input: {
        title: 'Another Blog',
        content: 'This is a new Blog',
        creatorID: '2',
      },
    },
  },
  PUBLISH_BLOG: {
    query: gql`
      mutation publishBlog($input: PublishBlogInput!) {
        publishBlog(input: $input) {
          id
          title
          published
        }
      }
    `,
    variables: {
      input: {
        id: 1,
        published: false,
      },
    },
  },
  DELETE_BLOG_FAILURE1: {
    query: gql`
      mutation deleteBlogFailure($input: DeleteBlogInput!) {
        deleteBlog(input: $input) {
          blog {
            id
            published
          }
          errorMessage
        }
      }
    `,
    variables: {
      input: {
        id: 10,
      },
    },
  },
  DELETE_BLOG_FAILURE2: {
    query: gql`
      mutation deleteBlogFailure($input: DeleteBlogInput!) {
        deleteBlog(input: $input) {
          blog {
            id
            published
          }
          errorMessage
        }
      }
    `,
    variables: {
      input: {
        id: 1,
      },
    },
  },
  DELETE_BLOG_SUCCESS: {
    query: gql`
      mutation deleteBlogFailure($input: DeleteBlogInput!) {
        deleteBlog(input: $input) {
          blog {
            id
            published
          }
          errorMessage
        }
      }
    `,
    variables: {
      input: {
        id: 5,
      },
    },
  },
};
