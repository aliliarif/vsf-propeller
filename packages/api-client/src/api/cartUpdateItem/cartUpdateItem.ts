import gql from 'graphql-tag';

export default gql`
  mutation cartUpdateItem($input: CartUpdateItemInput!) {
    cartUpdateItem(input: $input) {
      cart {
        cartId
        userId
      }
    }
  }
`;
