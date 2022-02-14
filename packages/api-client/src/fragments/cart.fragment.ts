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
      bundle {
        id
        comboId
        name
        description
        condition
        price
        originalPrice
        discountPrice
        discount
        items {
          isLeader
          productId
          originalPrice
          discountPrice
          product {
            name {
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
          }
        }
      }
    }
  }
`;
