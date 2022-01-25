import gql from 'graphql-tag';

export default gql`
  mutation cartAddItem(
    $input: CartAddItemInput!
    $attributeFilters: AttributeFilterInput
  ) {
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
            name {
              language
              value
            }
            slug {
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
