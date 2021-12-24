import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartAddItemQuery from './cartAddItem';

type cartItemInput = {
  cartId: number;
  productId: number;
  quantity: number;
};
type Variables = {
  cartItem: cartItemInput;
};

// TODO: add types
export default async (context, params, customQuery) => {
  const variables: Variables = {
    cartItem: {
      cartId: params.cartId,
      productId: params.productId,
      quantity: params.quantity,
    },
  };

  const { cartAddItem } = context.extendQuery(customQuery, {
    cartAddItem: {
      query: cartAddItemQuery,
      variables,
    },
  });

  console.log(cartAddItem.query);
  console.log(cartAddItem.variables);
  try {
    return context.client.mutate({
      mutation: gql`
        ${cartAddItem.query}
      `,
      variables: cartAddItem.variables,
    });
  } catch (error) {
    console.log('Error starting cart');
    console.log(error);
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error starting cart');
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
