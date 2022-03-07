import gql from 'graphql-tag';

export const CART_FIELDS = gql`
  fragment CartFields on Cart {
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
    taxLevels {
      price
      taxCode
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
      price
      priceNet
      totalPrice
      totalPriceNet
      quantity
      product {
        sku
        status
        isOrderable
        name {
          language
          value
        }
        shortName
        slug {
          language
          value
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
        inventory {
          totalQuantity
        }
      }
      bundle {
        id
        comboId
        name
        description
        condition
        discount
        price {
          net
          gross
          originalNet
          originalGross
        }
        items {
          isLeader
          productId
          price {
            net
            gross
            originalNet
            originalGross
          }
          product {
            isOrderable
            name {
              language
              value
            }
            inventory {
              totalQuantity
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
    }
  }
`;
