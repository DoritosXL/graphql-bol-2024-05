import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

function upperDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    // 👇 executes once for each OBJECT_FIELD
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // 👇 has this field got the @upper directive?
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (upperDirective) {
        // 👇 get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // 👇 replace the original resolver with a function that:
        //    1. calls the original resolver
        //    2. converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
}

export default upperDirectiveTransformer;