import gql from 'graphql-tag';
import productsQuery from './products';
import { CustomQuery } from '@vue-storefront/core';

// TODO: move this outside of this file
type TextFilterInput = {
  searchId: string;
  values: [string];
  exclude?: boolean;
  type?: any;
};

type AttributeFilterInput = {
  name: [string];
};
// type SortOrder {
//   asc:
// }
// type SortInput {
//   field: SortableFields!
//   order: SortOrder = "asc"
//   }
// *** //

type Variables = {
  slug: string;
  // sort: any;
  // term:
  offset?: number;
  page: number;
  textFilters?: [TextFilterInput];
  // rangeFilters?: [RangeFilterInput];
  attributeFilters?: AttributeFilterInput;
};

export default async (context, searchParams, customQuery?: CustomQuery) => {
  const defaultParams = {
    offset: 12,
    page: 1,
    ...searchParams,
  };

  const variables: Variables = {
    slug: searchParams.categorySlug,
    offset: defaultParams.offset <= 0 ? 10 : defaultParams.offset,
    page: defaultParams.page <= 0 ? 1 : defaultParams.page,
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
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
    console.log('ERROR');
    console.log(error);
    throw (
      error.graphQLErrors?.[0].message || error.networkError?.result || error
    );
  }
};
