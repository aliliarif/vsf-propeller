import gql from 'graphql-tag';

export default gql`
  query bundle($bundleId: Float!, $attributeFilters: AttributeFilterInput) {
    bundle(bundleId: $bundleId) {
      id
      comboId
      name
      description
      condition
      price
      originalPrice
      discountPrice
      discount
      items {
        isLeader
        productId
        originalPrice
        discountPrice
        product {
          name {
            language
            value
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
