import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartRemoveActionCodeQuery from './cartRemoveActionCode';

type AttributeFilterInput = {
  name: [string];
};

type cartRemoveActionCodeInput = {
  cartId: string;
  actionCode: string;
  attributeFilters?: AttributeFilterInput;
};

// TODO: add types
export default async (
  context,
  input: cartRemoveActionCodeInput,
  customQuery
) => {
  const variables: cartRemoveActionCodeInput = {
    cartId: input.cartId,
    actionCode: input.actionCode,
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  const { cartRemoveActionCode } = context.extendQuery(customQuery, {
    cartRemoveActionCode: {
      query: cartRemoveActionCodeQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartRemoveActionCode.query}
      `,
      variables: cartRemoveActionCode.variables,
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
