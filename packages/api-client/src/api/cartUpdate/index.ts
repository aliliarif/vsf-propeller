import gql from 'graphql-tag';
import { Logger, CustomQuery } from '@vue-storefront/core';
import cartUpdateQuery from './cartUpdate';
import { CartUpdateInput, CartUpdate } from '../../types/Inputs';

export default async (
  context,
  params: CartUpdate,
  customQuery?: CustomQuery
) => {
  const variables: CartUpdateInput = {
    input: {
      cartId: params.cartId,
    },
    language: context.config?.siteLanguage || 'NL',
  };

  if (params.paymentData) variables.input.paymentData = params.paymentData;
  if (params.postageData) variables.input.postageData = params.postageData;
  if (params.carrier) variables.input.carrier = params.carrier;
  if (params.notes) variables.input.notes = params.notes;
  if (params.reference) variables.input.reference = params.reference;

  if (context.config.productListAttributes)
    variables.attributeFilters = {
      name: context.config.productListAttributes,
    };

  const { cartUpdate } = context.extendQuery(customQuery, {
    cartUpdate: {
      query: cartUpdateQuery,
      variables,
    },
  });

  try {
    return context.client.mutate({
      mutation: gql`
        ${cartUpdate.query}
      `,
      variables: cartUpdate.variables,
    });
  } catch (error) {
    console.log('Error updating cart');
    console.log(error);
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error updating cart');
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
