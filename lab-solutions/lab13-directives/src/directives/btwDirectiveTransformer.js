import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

function btwDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {

    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const btwDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (btwDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          const value = parseFloat(result);

          if (Number.isNaN(value)) {
            return result;
          }

          const { percentage } = btwDirective;

          return value * (1 + percentage/100);
        }
        return fieldConfig;
      }
    }
  });
}

export default btwDirectiveTransformer;