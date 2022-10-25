import gql from 'graphql-tag';
import { MediaImagesFragment } from './mediaImages.fragment';
import { AttributeFragment } from './attribute.fragment';

export const CartFragment = gql`
  ${MediaImagesFragment}
  ${AttributeFragment}
  fragment Cart on Cart {
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
    paymentData {
      method
      netAmount
      grossAmount
      tax
      taxPercentage
    }
    items {
      id
      productId
      price
      priceNet
      totalPrice
      totalPriceNet
      quantity
      discount
      discountPercentage
      product {
        sku
        status
        isOrderable
        name(language: $language) {
          language
          value
        }
        shortName
        slug(language: $language) {
          language
          value
        }
        mediaImages(search: { sort: ASC }) {
          ...MediaImages
        }
        attributes(filter: $attributeFilters) {
          ...Attribute
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
            name(language: $language) {
              language
              value
            }
            inventory {
              totalQuantity
            }
            mediaImages(search: { sort: ASC }) {
              ...MediaImages
            }
            attributes(filter: $attributeFilters) {
              ...Attribute
            }
          }
        }
      }
    }
  }
`;
