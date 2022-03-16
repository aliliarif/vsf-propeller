import gql from 'graphql-tag';
import { Logger, CustomQuery } from '@vue-storefront/core';
import cartAddItemQuery from './cartAddItem';
import { CartAddItemInput } from '../../types/GraphQL';
import { CartAddItemArguments } from '../../types/API';

export default async (
  context,
  params: CartAddItemArguments,
  customQuery?: CustomQuery
) => {
  const variables: CartAddItemInput = {
    input: {
      cartId: params.cartId,
      productId: params.productId,
      quantity: params.quantity,
    },
    siteId: context.config?.siteId || 1,
    language: context.config?.siteLanguage || 'NL',
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
