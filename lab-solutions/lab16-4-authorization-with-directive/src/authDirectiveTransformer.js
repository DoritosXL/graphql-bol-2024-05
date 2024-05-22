import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

function authDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);

          const { requires } = authDirective;
          if (context.currentUser && context.currentUser.role === requires) {
            return result;
          }
          // return [];
          throw new Error(`You'll need to have ${requires} rights to do this!`);
        }
        return fieldConfig;
      }
    },
  });
}

export default authDirectiveTransformer