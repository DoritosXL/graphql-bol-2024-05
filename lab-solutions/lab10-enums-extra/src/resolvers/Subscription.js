const Subscription = {
  userModified: {
    subscribe: (_parent, _args, { pubsub }) => {
     return pubsub.asyncIterator('USER_MODIFIED');
    },
  },
};

export default Subscription;