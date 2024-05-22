const Subscription = {
  userCreated: {
    subscribe: (_parent, _args, { pubsub }) => {
     return pubsub.asyncIterator('USER_CREATED');
    },
  },
  userUpdated: {
    subscribe: (_parent, { userID }, { pubsub }) => {
      return pubsub.asyncIterator('USER_UPDATED_' + userID);
    }
  },
  blogCreated: {
    subscribe: (_parent, { userID }, { pubsub }) => {
      return pubsub.asyncIterator('BLOG_CREATED_' + userID);
    }
  }
};

export default Subscription;