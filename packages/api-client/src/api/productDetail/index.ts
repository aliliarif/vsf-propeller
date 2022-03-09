import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import productQuery from './product';

// TODO: move this outside of this file (same type is used on products)
type AttributeFilterInput = {
  name?: [string?];
  isPublic?: boolean;
};

enum CrossupsellTypes {
  ACCESSORIES,
  ALTERNATIVES,
  OPTIONS,
  PARTS,
  RELATED,
}

type CrossUpsellTypesInput = {
  types?: [CrossupsellTypes];
  subTypes?: [string];
};

type CrossUpsellInput = {
  input: CrossUpsellTypesInput;
};

type Variables = {
  productId: number;
  attributeFilters?: AttributeFilterInput;
  crossupsellTypesInput?: CrossUpsellInput;
};

export default async (context, searchParams, customQuery) => {
  const variables: Variables = {
    productId: parseInt(searchParams.id),
    attributeFilters: {
      name: [],
      isPublic: true,
    },
  };

  if (context.config.productAttributes)
    variables.attributeFilters.name = context.config.productAttributes;

  if (context.config.crossupsellTypes)
    variables.crossupsellTypesInput = {
      input: { types: context.config.crossupsellTypes },
    };

  const { product } = context.extendQuery(customQuery, {
    product: {
      query: productQuery,
      variables,
    },
  });

  try {
    return context.client.query({
      query: gql`
        ${product.query}
      `,
      variables: product.variables,
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
