import gql from 'graphql-tag';

export default gql`
  mutation cartUpdateAddress($cartUpdateAddressInput: CartUpdateAddressInput!) {
    cartUpdateAddress(input: $cartUpdateAddressInput) {
      # cartOrderId
      response {
        data
      }
    }
  }
`;
