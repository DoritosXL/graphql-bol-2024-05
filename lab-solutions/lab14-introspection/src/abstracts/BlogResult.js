const BlogResult = {
  __resolveType(item, _context, _info) {
    if (item.availableDate) return 'NotAvailableYet';
    if (!item.availableInCountry) return 'NotAvailableInCountry';
    if (item.price) return 'Blog';
    return null; // show GraphQLError
  },
};

export default BlogResult;