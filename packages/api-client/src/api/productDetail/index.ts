import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import productQuery from './productQuery';

type Variables = {
  productId: number;
};

export default async (context, searchParams, customQuery) => {
  const variables: Variables = {
    productId: parseInt(searchParams.id),
  };

  const { product } = context.extendQuery(customQuery, {
    product: {
      query: productQuery,
      variables,
    },
  });

  try {
    return context.client.query({
      query: gql`
        ${product.query}
      `,
      variables: product.variables,
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error in product');
      console.log(error);
      Logger.debug(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
};
