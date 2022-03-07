import gql from 'graphql-tag';
import { CART_FIELDS } from '../../fragments/cart.fragment';

export default gql`
  ${CART_FIELDS}
  query cart($cartId: String!, $attributeFilters: AttributeFilterInput) {
    cart(cartId: $cartId) {
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
      ...CartFields
    }
  }
`;
