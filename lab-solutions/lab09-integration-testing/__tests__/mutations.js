import server from '../test-setup/server.js';
import { initDB } from '../test-setup/helpers.js';
import user from '../test-setup/mutation-user.js';
import blog from '../test-setup/mutation-blog.js';

describe('mutations-users', () => {
  beforeEach(() => {
    initDB();
  });

  it('create User', async () => {
    const { query, variables } = user.CREATE_USER;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.createUser).toMatchSnapshot();
  });

  it('update User', async () => {
    const { query, variables } = user.UPDATE_USER;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.updateUser).toMatchSnapshot();
  });

  it('delete User', async () => {
    const { query, variables } = user.DELETE_USER;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.deleteUser).toMatchSnapshot();
  });

  it('create Blog', async () => {
    const { query, variables } = blog.CREATE_BLOG;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.createBlog).toMatchSnapshot();
  });

  it('publish Blog', async () => {
    const { query, variables } = blog.PUBLISH_BLOG;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.publishBlog).toMatchSnapshot();
  });

  it('delete Blog: get error message when blog id does not exist', async () => {
    const { query, variables } = blog.DELETE_BLOG_FAILURE1;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.deleteBlog).toMatchSnapshot();
  });

  it('delete Blog: get error message when blog id exists and blog has comments', async () => {
    const { query, variables } = blog.DELETE_BLOG_FAILURE2;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.deleteBlog).toMatchSnapshot();
  });

  it('delete Blog: succeeds when blog id exists and has no comments', async () => {
    const { query, variables } = blog.DELETE_BLOG_SUCCESS;
    const { data } = await server.executeOperation({ query, variables });
    expect(data.deleteBlog).toMatchSnapshot();
  });
});
