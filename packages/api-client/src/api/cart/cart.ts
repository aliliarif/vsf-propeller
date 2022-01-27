import gql from 'graphql-tag';

export default gql`
  query cart($cartId: String!, $attributeFilters: AttributeFilterInput) {
    cart(cartId: $cartId) {
      cartId
      userId
      actionCode
      deliveryAddress {
        company
        gender
        firstName
        lastName
        middleName
        street
        number
        numberExtension
        postalCode
        city
        country
        region
        phone
        email
      }
      invoiceAddress {
        company
        gender
        firstName
        lastName
        middleName
        street
        number
        numberExtension
        postalCode
        city
        country
        region
        phone
        email
      }
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
  }
`;
