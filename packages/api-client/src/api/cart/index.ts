import gql from 'graphql-tag';
import { Logger, CustomQuery } from '@vue-storefront/core';
import cartQuery from './cart';
import { CartInput } from '../../types/GraphQL';

export default async (context, cartId: string, customQuery?: CustomQuery) => {
  const variables: CartInput = {
    cartId,
    siteId: context.config?.siteId || 1,
    language: context.config?.siteLanguage || 'NL',
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
