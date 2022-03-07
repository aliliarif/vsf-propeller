import gql from 'graphql-tag';
import { CART_FIELDS } from '../../fragments/cart.fragment';

export default gql`
  ${CART_FIELDS}
  mutation cartAddBundle(
    $input: CartAddBundleInput!
    $attributeFilters: AttributeFilterInput
  ) {
    cartAddBundle(input: $input) {
      cart {
        ...CartFields
      }
    }
  }
`;
