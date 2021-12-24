import gql from 'graphql-tag';

export default gql`
  mutation cartAddItem($cartItem: CartAddItemInput!) {
    cartAddItem(input: $cartItem) {
      cart {
        cartId
        userId
      }
    }
  }
`;
