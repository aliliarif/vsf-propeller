import gql from 'graphql-tag';
import { Logger, CustomQuery } from '@vue-storefront/core';
import bundleQuery from './bundle';
import { BundleDetailArguments } from '../../types/API';
import { BundleDetailInput } from '../../types/GraphQL';

export default async (
  context,
  params: BundleDetailArguments,
  customQuery?: CustomQuery
) => {
  const variables: BundleDetailInput = {
    bundleId: parseInt(params.bundleId),
    siteId: context.config?.siteId || 1,
    language: context.config?.siteLanguage || 'NL',
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
