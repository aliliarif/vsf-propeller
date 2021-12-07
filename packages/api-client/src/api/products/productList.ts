import gql from 'graphql-tag';

export default gql`
  query productsList($catgoryId: Int) {
    products(categoryId: $catgoryId) {
      items {
        name {
          value
        }
      }
    }
  }
`;
