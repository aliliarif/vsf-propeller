import gql from 'graphql-tag';
import productsQuery from './productsQuery';
import { CustomQuery } from '@vue-storefront/core';

// TODO: move this outside of this file
type TextFilterInput = {
  searchId: string;
  values: [string];
  exclude?: boolean;
  type?: any;
};
// type SortInput {
//   field: SortableFields!
//   order: SortOrder = "asc"
//   }
// *** //

type Variables = {
  slug: string;
  // sort: SortInput;
  // term:
  // offset:
  // page:
  textFilters?: [TextFilterInput];
  // rangeFilters?: [RangeFilterInput];
};

export default async (context, searchParams, customQuery?: CustomQuery) => {
  const variables: Variables = {
    slug: searchParams.categorySlug,
  };

  if (searchParams.textFilters)
    variables.textFilters = searchParams.textFilters;

  const { products } = context.extendQuery(customQuery, {
    products: {
      query: productsQuery,
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
    console.log('ERROR2');
    console.log(error);
    throw (
      error.graphQLErrors?.[0].message || error.networkError?.result || error
    );
  }
};
