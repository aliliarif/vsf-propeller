import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartSetUserQuery from './cartSetUser';

type CartSetUserInput = {
  cartId: string;
  userId: number;
};
type Variables = {
  input: CartSetUserInput;
};

// TODO: add types
export default async (context, params, customQuery) => {
  const variables: Variables = {
    input: {
      cartId: params.cartId,
      userId: params.userId
    }
  };

  const { cartSetUser } = context.extendQuery(customQuery, {
    cartSetUser: {
      query: cartSetUserQuery,
      variables
    }
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartSetUser.query}
      `,
      variables: cartSetUser.variables
    });
  } catch (error) {
    console.log('Error setting cart user');
    console.log(error);
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error setting cart user');
      console.log(error);
      Logger.debug(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
};
