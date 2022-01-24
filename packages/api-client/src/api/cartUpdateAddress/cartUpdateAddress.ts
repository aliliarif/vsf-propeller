import gql from 'graphql-tag';

export default gql`
  mutation cartUpdateAddress($input: CartUpdateAddressInput!) {
    cartUpdateAddress(input: $input) {
      cart {
        deliveryAddress {
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
      }
    }
  }
`;
