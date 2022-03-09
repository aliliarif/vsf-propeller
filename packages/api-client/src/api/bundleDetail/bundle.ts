import gql from 'graphql-tag';

export default gql`
  query bundle($bundleId: Float!, $attributeFilters: AttributeFilterInput) {
    bundle(bundleId: $bundleId) {
      id
      comboId
      name
      description
      discount
      condition
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
          name {
            language
            value
          }
          inventory {
            totalQuantity
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
