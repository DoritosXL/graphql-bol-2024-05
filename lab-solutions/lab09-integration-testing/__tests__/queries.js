import server from '../test-setup/server.js';
import { initDB } from '../test-setup/helpers.js';
import user from '../test-setup/query-user.js';
import blog from '../test-setup/query-blog.js';
import comment from '../test-setup/query-comment.js';

describe('queries', () => {
  beforeAll(() => {
    initDB();
  });

  it('get users', async () => {
    const { query } = user.GET_USERS;
    const { data } = await server.executeOperation({ query });
    expect(data.users).toMatchSnapshot();
  });

  it('get users with blogs and comments', async () => {
    const { query } = user.GET_USERS_WITH_BLOGS_AND_COMMENTS;
    const { data } = await server.executeOperation({ query });
    expect(data.users).toMatchSnapshot();
  });

  it('get first user', async () => {
    const { query } = user.GET_FIRST_USER;
    const { data } = await server.executeOperation({ query });
    expect(data.firstUser).toMatchSnapshot();
  });

  it('get limited users: get error message when 2 arguments provided', async () => {
    const { query } = user.GET_LIMITED_USERS_FAILURE1;
    const { data, errors } = await server.executeOperation({ query });
    expect(data).toBeNull();
    expect(errors[0].message).toEqual(
      'Provide either a first or last argument!'
    );
  });

  it('get limited users: gets error message when no arguments provided', async () => {
    const { query } = user.GET_LIMITED_USERS_FAILURE2;
    const { data, errors } = await server.executeOperation({ query });
    expect(data).toBeNull();
    expect(errors[0].message).toEqual(
      'Provide either a first or last argument!'
    );
  });

  it('get limited users: gets users when `last` argument provided', async () => {
    const { query } = user.GET_LIMITED_USERS_SUCCESS1;
    const { data } = await server.executeOperation({ query });
    expect(data.usersLimited).toMatchSnapshot();
  });

  it('get limited users: gets users when `first` argument provided', async () => {
    const { query } = user.GET_LIMITED_USERS_SUCCESS2;
    const { data } = await server.executeOperation({ query });
    expect(data.usersLimited).toMatchSnapshot();
  });

  it('get users by firstname', async () => {
    const { query } = user.GET_USERS_BY_FIRSTNAME;
    const { data } = await server.executeOperation({ query });
    expect(data.usersByFirstName).toMatchSnapshot();
  });

  it('get blogs', async () => {
    const { query } = blog.GET_BLOGS;
    const { data } = await server.executeOperation({ query });
    expect(data.blogs).toMatchSnapshot();
  });

  it('get blogs with comments', async () => {
    const { query } = blog.GET_BLOGS_WITH_COMMENTS;
    const { data } = await server.executeOperation({ query });
    expect(data.blogs).toMatchSnapshot();
  });

  it('get blogs with creator and comments', async () => {
    const { query } = blog.GET_BLOGS_WITH_CREATOR_AND_COMMENTS;
    const { data } = await server.executeOperation({ query });
    expect(data.blogs).toMatchSnapshot();
  });

  it('get blog by id', async () => {
    const { query } = blog.GET_BLOG_BY_ID;
    const { data } = await server.executeOperation({ query });
    expect(data.blogById).toMatchSnapshot();
  });

  it('get blogs by filter', async () => {
    const { query, variables } = blog.GET_BLOGS_BY_FILTER;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.blogsByFilter).toMatchSnapshot();
  });

  it('get comments', async () => {
    const { query } = comment.GET_COMMENTS;
    const { data } = await server.executeOperation({ query });
    expect(data.comments).toMatchSnapshot();
  });

  it('get comments with blog and commentator', async () => {
    const { query } = comment.GET_COMMENTS_WITH_BLOG_AND_COMMENTATOR;
    const { data } = await server.executeOperation({ query });
    expect(data.comments).toMatchSnapshot();
  });
});
