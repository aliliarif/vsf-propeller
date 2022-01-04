import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartProcessQuery from './cartProcess';

type processCartInput = {
  cartId: string;
  orderStatus: string;
};
type Variables = {
  input: processCartInput;
};

// TODO: add types
export default async (context, params, customQuery) => {
  const variables: Variables = {
    input: {
      cartId: params.cartId,
      orderStatus: 'NEW',
    },
  };

  const { cartProcess } = context.extendQuery(customQuery, {
    cartProcess: {
      query: cartProcessQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartProcess.query}
      `,
      variables: cartProcess.variables,
    });
  } catch (error) {
    console.log('Error processing cart');
    console.log(error);
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error processing cart');
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
