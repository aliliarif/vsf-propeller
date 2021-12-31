import gql from 'graphql-tag';

export default gql`
  query cart($cartId: String!) {
    cart(cartId: $cartId) {
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
      deliveryAddress {
        firstName
        lastName
        gender
        number
        postalCode
        city
        middleName
        numberExtension
        country
        phone
        email
      }
      invoiceAddress {
        firstName
        lastName
        gender
        number
        postalCode
        city
        middleName
        numberExtension
        country
        phone
        email
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
`;
