import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
// import {
//   ProductAttributeFilterInput,
//   ProductAttributeSortInput,
//   ProductsListQuery,
//   ProductsListQueryVariables,
// } from '../../types/GraphQL';
import productsQuery from './productsQuery';
// import { Context } from '../../types/context';
// import { GetProductSearchParams } from '../../types/API';

// type Variables = {
//   pageSize: number;
//   currentPage: number;
//   search?: string;
//   filter?: ProductAttributeFilterInput;
//   sort?: ProductAttributeSortInput;
// };

type Variables = {
  categoryId: number;
};

export default async (context, searchParams, customQuery) => {
  const variables: Variables = {
    categoryId: 227187,
  };

  // if (defaultParams.search) variables.search = defaultParams.search;
  console.log('FFWWEWEWEWE');
  console.log(customQuery);
  const { products } = context.extendQuery(customQuery, {
    products: {
      query: productsQuery,
      variables,
    },
  });

  console.log('FFF');
  console.log(products);

  try {
    return await context.client.query({
      query: gql`
        ${products.query}
      `,
      variables: products.variables,
    });
  } catch (error) {
    console.log('ERROR');
    console.log(error);
    throw (
      error.graphQLErrors?.[0].message || error.networkError?.result || error
    );
  }
};
