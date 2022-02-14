import gql from 'graphql-tag';
import { CART_FIELDS } from '../../fragments/cart.fragment';

export default gql`
  ${CART_FIELDS}
  mutation cartDeleteItem(
    $input: CartDeleteItemInput!
    $attributeFilters: AttributeFilterInput
  ) {
    cartDeleteItem(input: $input) {
      cart {
        ...CartFields
      }
    }
  }
`;
