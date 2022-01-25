import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartUpdateItemQuery from './cartUpdateItem';

type cartItemInput = {
  cartId: string;
  quantity: number;
  notes?: string;
  itemId: number;
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
      quantity: params.quantity,
      itemId: params.itemId,
    },
  };

  if (params.notes) variables.input.notes = params.notes;

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  const { cartUpdateItem } = context.extendQuery(customQuery, {
    cartUpdateItem: {
      query: cartUpdateItemQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartUpdateItem.query}
      `,
      variables: cartUpdateItem.variables,
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
        data: null,
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
};
