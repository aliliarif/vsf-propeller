import gql from 'graphql-tag';
import productsQuery from './productsQuery';

type Variables = {
  slug: string;
};

export default async (context, searchParams, customQuery) => {
  const variables: Variables = {
    slug: searchParams.categorySlug,
  };

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
