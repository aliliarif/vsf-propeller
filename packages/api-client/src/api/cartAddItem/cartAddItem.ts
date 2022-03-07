import gql from 'graphql-tag';
import { CART_FIELDS } from '../../fragments/cart.fragment';

export default gql`
  ${CART_FIELDS}
  mutation cartAddItem(
    $input: CartAddItemInput!
    $attributeFilters: AttributeFilterInput
  ) {
    cartAddItem(input: $input) {
      cart {
        ...CartFields
      }
    }
  }
`;
