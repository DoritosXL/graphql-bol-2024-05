import crypto from 'crypto';

function UUID() {
  return crypto.randomBytes(16).toString('hex');
}

const Mutation = {
  createUser: (_parent, { input }, { db }) => {
    const user = { id: UUID(), ...input };
    db.users.push(user)
    return user;
  },
  updateUser: (_parent, { input }, { db }) => {
    const { id, firstname, email, yearOfBirth } = input;
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found!');
    }

    if (firstname) {
      user.firstname = firstname;
    }

    if (email) {
      user.email = email;
    }

    if (yearOfBirth) {
      user.yearOfBirth = yearOfBirth;
    }

    return user;
  },
  deleteUser: (_parent, { input }, { db }) => {
    const { id } = input;
    const foundIndex = db.users.findIndex((user) => user.id === id);

    if (foundIndex === -1) {
      throw new Error('User not found!');
    }

    const user = { ... db.users[foundIndex] };    // store copy of user
    db.users.splice(foundIndex, 1);               // remove user from data source

    return user;
  },
  createBlog: (_parent, { input }, { db }) => {
    const { title, content, creatorID } = input;
    const blog = { 
      id: UUID(), 
      title,
      content,
      published: false, 
      userid: creatorID
    };
    db.blogs.push(blog);
    return blog;
  },
  publishBlog: (_parent, { input }, { db }) => {
    const { id, published } = input;

    const blog = db.blogs.find((blog) => blog.id === id);

    if (!blog) {
      throw new Error('Blog not found!');
    }

    blog.published = published;

    return blog;
  },
  deleteBlog: (_parent, { input }, { db }) => {
    const { id } = input;
    const foundIndex = db.blogs.findIndex((blog) => blog.id === id);

    if (foundIndex === -1) {
      return {
        blog: null,
        errorMessage: 'Blog not found!',
      };
    }

    const hasComments = db.comments.some((comment) => comment.blogid === id);
    if (hasComments) {
      console.log('Blog contains comments!');
      return {
        blog: null,
        errorMessage: 'Blog contains comments!',
      };
    }

    const blog = { ...db.blogs[foundIndex] };     // store copy of blog
    db.blogs.splice(foundIndex, 1);               // remove user from data source

    return {
      blog,
      errorMessage: null,
    };
  },
};

export default Mutation;