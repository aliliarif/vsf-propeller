import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
// import {
//   ProductAttributeFilterInput,
//   ProductAttributeSortInput,
//   ProductsListQuery,
//   ProductsListQueryVariables,
// } from '../../types/GraphQL';
import productsList from './productList';
// import { Context } from '../../types/context';
// import { GetProductSearchParams } from '../../types/API';

// type Variables = {
//   pageSize: number;
//   currentPage: number;
//   search?: string;
//   filter?: ProductAttributeFilterInput;
//   sort?: ProductAttributeSortInput;
// };

export default async (context, searchParams, customQuery) => {
  const variables = {
    categoryId: 227171,
  };

  // if (defaultParams.search) variables.search = defaultParams.search;

  const { products } = context.extendQuery(customQuery, {
    products: {
      query: productsList,
      variables,
    },
  });

  try {
    return await context.client.query({
      query: gql`
        ${products.query}
      `,
      variables: products.variables,
    });
  } catch (error) {
    throw (
      error.graphQLErrors?.[0].message || error.networkError?.result || error
    );
  }
};
