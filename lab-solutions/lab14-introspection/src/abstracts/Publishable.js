const Publishable = {
  __resolveType(item, _context, _info) {
    if (item.title) return 'Blog';
    if (item.blogid) return 'Comment';
    return null; // show GraphQLError
  },
};

export default Publishable;