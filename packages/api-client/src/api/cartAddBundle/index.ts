import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartAddBundleQuery from './cartAddBundle';

type cartBundleInput = {
  cartId: string;
  comboId: number;
  quantity: number;
};

type AttributeFilterInput = {
  name: [string];
};

type Variables = {
  input: cartBundleInput;
  attributeFilters?: AttributeFilterInput;
};

// TODO: add types
export default async (context, params, customQuery) => {
  const variables: Variables = {
    input: {
      cartId: params.cartId,
      comboId: params.comboId,
      quantity: params.quantity,
    },
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  const { cartAddBundle } = context.extendQuery(customQuery, {
    cartAddBundle: {
      query: cartAddBundleQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartAddBundle.query}
      `,
      variables: cartAddBundle.variables,
    });
  } catch (error) {
    console.log('Error adding bundle to cart');
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
