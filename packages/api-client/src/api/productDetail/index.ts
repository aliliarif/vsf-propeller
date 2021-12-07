import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery, Logger } from '@vue-storefront/core';
// import {
//   ProductAttributeFilterInput,
//   ProductAttributeSortInput,
//   ProductDetailsQuery,
//   ProductDetailsQueryVariables,
// } from '../../types/GraphQL';
import productQuery from './productQuery';
// import { Context } from '../../types/context';
// import { GetProductSearchParams } from '../../types/API';

type Variables = {
  productId: number;
};

export default async (context, searchParams, customQuery) => {
  console.log('searchParams');
  console.log(searchParams);
  console.log(searchParams.id);
  const variables: Variables = {
    productId: parseInt(searchParams.id),
  };

  const { product } = context.extendQuery(customQuery, {
    product: {
      query: productQuery,
      variables,
    },
  });
  console.log('product.query');
  console.log(product.query);
  console.log(product.variables);
  try {
    const result = await context.client.query({
      query: gql`
        ${product.query}
      `,
      variables: product.variables,
    });

    // if (result.data.product.length === 0) throw new Error('No product found');

    return result;
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error in product');
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
