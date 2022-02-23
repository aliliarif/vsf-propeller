import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import bundleQuery from './bundle';

// TODO: move this outside of this file (same type is used on products)
type AttributeFilterInput = {
  name: [string];
};

type Variables = {
  bundleId: number;
  attributeFilters?: AttributeFilterInput;
};

export default async (context, searchParams, customQuery) => {
  const variables: Variables = {
    bundleId: parseInt(searchParams.bundleId),
  };

  if (context.config.productAttributes)
    variables.attributeFilters = {
      name: context.config.productAttributes,
    };

  const { bundle } = context.extendQuery(customQuery, {
    bundle: {
      query: bundleQuery,
      variables,
    },
  });

  try {
    return context.client.query({
      query: gql`
        ${bundle.query}
      `,
      variables: bundle.variables,
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
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
