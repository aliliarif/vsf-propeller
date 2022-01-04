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
  // const variables: Variables = {
  //   input: {
  //     cartId: params.cartId,
  //     type: params.type,
  //     firstName: params.firstName,
  //     lastName: params.lastName,
  //     street: params.street,
  //     number: params.number,
  //     postalCode: params.postalCode,
  //     city: params.city,
  //   },
  // };

  // if (params.company) variables.input.company = params.company;

  // if (params.gender) variables.input.gender = params.gender;

  // if (params.middleName) variables.input.middleName = params.middleName;

  // if (params.numberExtension)
  //   variables.input.numberExtension = params.numberExtension;

  // if (params.region) variables.input.region = params.region;

  // if (params.country) variables.input.country = params.country;

  // if (params.code) variables.input.code = params.code;

  // if (params.email) variables.input.email = params.email;

  // if (params.mobile) variables.input.mobile = params.mobile;

  // if (params.phone) variables.input.phone = params.phone;

  // if (params.url) variables.input.url = params.url;

  // if (params.icp) variables.input.icp = params.icp;

  // if (params.notes) variables.input.notes = params.notes;

  const { cartAddItem } = context.extendQuery(customQuery, {
    cartAddItem: {
      query: cartUpdateAddressQuery,
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
