import gql from 'graphql-tag';

export default gql`
  query cart($cartId: String!) {
    cart(cartId: $cartId) {
      items {
        id
        productId
        product {
          name {
            language
            value
          }
          ... on Product {
            images(siteId: 1) {
              id
              imageId
              name
              url(fillColor: "white", method: fill, height: 800, width: 800)
              type
              order
            }
          }
        }
      }
    }
  }
`;
