import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartAddActionCodeQuery from './cartAddActionCode';

type AttributeFilterInput = {
  name: [string];
};

type cartAddActionCodeInput = {
  cartId: string;
  actionCode: string;
  attributeFilters?: AttributeFilterInput;
};

// TODO: add types
export default async (context, input: cartAddActionCodeInput, customQuery) => {
  const variables: cartAddActionCodeInput = {
    cartId: input.cartId,
    actionCode: input.actionCode,
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  const { cartAddActionCode } = context.extendQuery(customQuery, {
    cartAddActionCode: {
      query: cartAddActionCodeQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartAddActionCode.query}
      `,
      variables: cartAddActionCode.variables,
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }
    throw error.networkError?.result || error;
  }
};
