import gql from 'graphql-tag';
import productsQuery from './products';
import { CustomQuery } from '@vue-storefront/core';
import { ProductsInput } from '../../types/GraphQL';
import { ProductsArguments } from '../../types/API';

export default async (
  context,
  params: ProductsArguments,
  customQuery?: CustomQuery
) => {
  const variables: ProductsInput = {
    slug: params.categorySlug,
    offset: params.offset <= 0 ? 12 : params.offset,
    page: params.page <= 0 ? 1 : params.page,
    siteId: context.config?.siteId || 1,
    language: context.config?.siteLanguage || 'NL',
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  if (params.textFilters) variables.textFilters = params.textFilters;

  if (params.sort) variables.sort = params.sort;

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
