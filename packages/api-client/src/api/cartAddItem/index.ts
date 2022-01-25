import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartAddItemQuery from './cartAddItem';

type cartItemInput = {
  cartId: string;
  productId: number;
  quantity: number;
};

type AttributeFilterInput = {
  name: [string];
};

type Variables = {
  input: cartItemInput;
  attributeFilters?: AttributeFilterInput;
};

// TODO: add types
export default async (context, params, customQuery) => {
  const variables: Variables = {
    input: {
      cartId: params.cartId,
      productId: params.productId,
      quantity: params.quantity,
    },
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  const { cartAddItem } = context.extendQuery(customQuery, {
    cartAddItem: {
      query: cartAddItemQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartAddItem.query}
      `,
      variables: cartAddItem.variables,
    });
  } catch (error) {
    console.log('Error adding item to cart');
    console.log(error);
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error adding item to cart');
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
