import gql from 'graphql-tag';

export default gql`
  mutation cartStart($siteId: Float!) {
    cartStart(siteId: $siteId) {
      cartId
    }
  }
`;
