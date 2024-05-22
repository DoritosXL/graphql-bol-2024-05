export const authorized = (role) => {
  return (next) => {
    return (root, args, context, info) => {
      if (context.currentUser.role !== role) {
        throw new Error(`Unauthorized!`);
      }
      return next(root,args, context, info);
    };
  }
};