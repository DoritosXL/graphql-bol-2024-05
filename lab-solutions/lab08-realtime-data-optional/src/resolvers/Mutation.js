import crypto from 'crypto';

function UUID() {
  return crypto.randomBytes(16).toString('hex');
}

const Mutation = {
  createUser: (_parent, { input }, { db, pubsub }) => {
    const user = { id: UUID(), ...input };
    db.users.push(user);

    pubsub.publish(
      'USER_CREATED',         // topic AKA channel name
      { userCreated: user }   // the payload, 'userCreated' mirrors the schema!
    );

    return user;
  },
  updateUser: (_parent, { input }, { db, pubsub }) => {
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

    pubsub.publish('USER_UPDATED_' + id, { userUpdated: user });

    return user;
  },
  createBlog: (_parent, { input }, { db, pubsub }) => {
    const { title, content, creatorID } = input;
    const blog = { 
      id: UUID(), 
      title,
      content,
      published: false, 
      userid: creatorID
    };

    db.blogs.push(blog);

    pubsub.publish(
      'BLOG_CREATED_' + creatorID,  // topic
      { blogCreated: blog }         // payload
    );

    return blog;
  },
};

export default Mutation;