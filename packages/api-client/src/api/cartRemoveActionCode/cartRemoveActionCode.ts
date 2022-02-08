import gql from 'graphql-tag';

export default gql`
  mutation cartRemoveActionCode(
    $cartId: String!
    $actionCode: String!
    $attributeFilters: AttributeFilterInput
  ) {
    cartRemoveActionCode(cartId: $cartId, actionCode: $actionCode) {
      cart {
        cartId
        userId
        actionCode
        total {
          subTotal
          subTotalNet
          discountPercentage
          totalNet
          totalGross
          discountNet
          discountGross
        }
        postageData {
          shippingMethod
          postageTaxPercentage
          postage
          postageNet
        }
        items {
          id
          productId
          quantity
          product {
            sku
            status
            isOrderable
            orderableFrom
            orderableTo
            name {
              language
              value
            }
            slug {
              language
              value
            }
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
            attributes(filter: $attributeFilters) {
              searchId
              name
              description {
                value
                language
              }
              textValue {
                values
                language
              }
            }
          }
        }
      }
      response {
        data
      }
    }
  }
`;