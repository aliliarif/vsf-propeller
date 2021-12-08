import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import categoryQuery from './categoriesQuery';

type Variables = {
  categoryId: number;
};

export default async (context, searchParams, customQuery) => {
  const variables: Variables = {
    categoryId: 100092,
  };

  const { category } = context.extendQuery(customQuery, {
    category: {
      query: categoryQuery,
      variables,
    },
  });

  try {
    return await context.client.query({
      query: gql`
        ${category.query}
      `,
      variables: category.variables,
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      console.log('Error in categories');
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
