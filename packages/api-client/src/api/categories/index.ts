import gql from 'graphql-tag';
import categoriesQuery from './categoriesQuery';

type Variables = {
  categoryId: number;
};

export default async (context, searchParams, customQuery) => {
  const variables: Variables = {
    categoryId: context.config.catalogueRoot,
  };

  const { category } = context.extendQuery(customQuery, {
    category: {
      query: categoriesQuery,
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

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }

    throw error.networkError?.result || error;
  }
};
