import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartQuery from './cart';

// TODO: move this outside of this file (same type is used on products)
type Variables = {
  cartId: string;
};

export default async (context, cartId, customQuery) => {
  const variables: Variables = {
    cartId,
  };

  const { cart } = context.extendQuery(customQuery, {
    cart: {
      query: cartQuery,
      variables,
    },
  });

  try {
    return context.client.query({
      query: gql`
        ${cart.query}
      `,
      variables: cart.variables,
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
