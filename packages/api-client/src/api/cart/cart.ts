import gql from 'graphql-tag';

export default gql`
  query cart($cartId: String!) {
    cart(cartId: $cartId) {
      total {
        subTotal
        subTotalNet
        discountPercentage
        totalNet
        totalGross
        discountNet
        discountGross
      }
      items {
        id
        productId
        product {
          name {
            language
            value
          }
          ... on Product {
            price {
              value
              quantity
              discount {
                discountId
                formula
                type
                quantity
                value
                validFrom
                validTo
              }
              taxCode
              type
            }
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
