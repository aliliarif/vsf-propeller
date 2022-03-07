import gql from 'graphql-tag';
import { CART_FIELDS } from '../../fragments/cart.fragment';

export default gql`
  ${CART_FIELDS}
  mutation cartAddActionCode(
    $cartId: String!
    $actionCode: String!
    $attributeFilters: AttributeFilterInput
  ) {
    cartAddActionCode(cartId: $cartId, actionCode: $actionCode) {
      cart {
        ...CartFields
      }
    }
  }
`;
