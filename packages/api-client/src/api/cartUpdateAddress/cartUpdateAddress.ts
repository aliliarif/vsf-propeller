import gql from 'graphql-tag';

export default gql`
  mutation cartUpdateAddress($input: CartUpdateAddressInput!) {
    cartUpdateAddress(input: $input) {
      # cartOrderId
      response {
        data
      }
    }
  }
`;
