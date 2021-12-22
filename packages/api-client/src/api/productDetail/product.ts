import gql from 'graphql-tag';

export default gql`
  query productDetails(
    $productId: Int!
    $attributeFilters: AttributeFilterInput
  ) {
    product(id: $productId) {
      name {
        value
        language
      }
      description {
        value
        language
      }
      shortDescription {
        value
        language
      }
      sku
      categoryId
      path
      shortName
      eanCode
      manufacturer
      manufacturerCode
      supplier
      supplierCode
      taxCode
      status
      originalPrice
      costPrice
      suggestedPrice
      storePrice
      minimumQuantity
      unit
      purchaseUnit
      purchaseMinimumQuantity
      econommicOrderQuantity
      ... on Product {
        id
        language
        class
        classId
        images(siteId: 1) {
          id
          imageId
          name
          url(fillColor: "white", method: fill, height: 800, width: 800)
          type
          order
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
            hops
          }
          taxCode
          type
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
`;
