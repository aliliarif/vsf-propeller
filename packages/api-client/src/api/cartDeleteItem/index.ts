import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartDeleteItemQuery from './cartDeleteItem';

type cartDeleteItemInput = {
  cartId: string;
  itemId: number;
};

type AttributeFilterInput = {
  name: [string];
};

type Variables = {
  input: cartDeleteItemInput;
  attributeFilters?: AttributeFilterInput;
};

// TODO: add types
export default async (context, params, customQuery) => {
  const variables: Variables = {
    input: {
      cartId: params.cartId,
      itemId: params.itemId,
    },
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  const { cartDeleteItem } = context.extendQuery(customQuery, {
    cartDeleteItem: {
      query: cartDeleteItemQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartDeleteItem.query}
      `,
      variables: cartDeleteItem.variables,
    });
  } catch (error) {
    console.log('Error deleting item');
    console.log(error);
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error deleting item');
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
