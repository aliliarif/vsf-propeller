import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartUpdateItemQuery from './cartUpdateItem';

type cartItemInput = {
  cartId: string;
  quantity: number;
  notes?: string;
  itemId: number;
};
type Variables = {
  input: cartItemInput;
};

// TODO: add types
export default async (context, params, customQuery) => {
  const variables: Variables = {
    input: {
      cartId: params.cartId,
      quantity: params.quantity,
      // notes: params.notes,
      itemId: params.productId
    }
  };

  const { cartUpdateItem } = context.extendQuery(customQuery, {
    cartUpdateItem: {
      query: cartUpdateItemQuery,
      variables
    }
  });

  console.log(cartUpdateItem.query);
  console.log(cartUpdateItem.variables);

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartUpdateItem.query}
      `,
      variables: cartUpdateItem.variables
    });
  } catch (error) {
    console.log('Error updating cart item');
    console.log(error);
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error updating cart item');
      console.log(error);
      Logger.debug(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
};
