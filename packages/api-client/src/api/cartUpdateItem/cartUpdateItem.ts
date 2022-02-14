import gql from 'graphql-tag';
import { CART_FIELDS } from '../../fragments/cart.fragment';

export default gql`
  ${CART_FIELDS}
  mutation cartUpdateItem(
    $input: CartUpdateItemInput!
    $attributeFilters: AttributeFilterInput
  ) {
    cartUpdateItem(input: $input) {
      cart {
        ...CartFields
      }
    }
  }
`;
