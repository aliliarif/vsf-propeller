import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import cartUpdateAddressQuery from './cartUpdateAddress';

enum cartAddressEnum {
  invoice,
  delivery,
}

enum genderEnum {
  M,
  F,
  U,
}

enum yesNoEnum {
  Y,
  N,
}

type CartUpdateAddressInput = {
  cartId: string;
  type: cartAddressEnum;
  company?: string;
  gender?: genderEnum;
  firstName: string;
  middleName?: string;
  lastName: string;
  street: string;
  number: string;
  numberExtension?: string;
  postalCode: string;
  city: string;
  region?: string;
  country?: string;
  code?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  url?: string;
  icp?: yesNoEnum;
  notes?: string;
};
type Variables = {
  input: CartUpdateAddressInput;
};

// TODO: add types
export default async (context, input: CartUpdateAddressInput, customQuery) => {
  const defaultParams = {
    firstName: '',
    lastName: '',
    street: '',
    number: '',
    postalCode: '',
    city: '',
    ...input,
  };

  const variables = {
    input: {
      ...defaultParams,
    },
  };

  const { cartUpdateAddress } = context.extendQuery(customQuery, {
    cartUpdateAddress: {
      query: cartUpdateAddressQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartUpdateAddress.query}
      `,
      variables: cartUpdateAddress.variables,
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
