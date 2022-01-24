import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartQuery from './cart';

// TODO: move this outside of this file (same type is used on products)

type AttributeFilterInput = {
  name: [string];
};

type Variables = {
  cartId: string;
  attributeFilters?: AttributeFilterInput;
};

export default async (context, cartId, customQuery) => {
  const variables: Variables = {
    cartId,
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
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
