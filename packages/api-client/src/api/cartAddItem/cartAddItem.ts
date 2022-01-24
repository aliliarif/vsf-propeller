import gql from 'graphql-tag';

export default gql`
  mutation cartAddItem($input: CartAddItemInput!) {
    cartAddItem(input: $input) {
      cart {
        cartId
        userId
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
          quantity
          product {
            name {
              language
              value
            }
            sku
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
  }
`;
