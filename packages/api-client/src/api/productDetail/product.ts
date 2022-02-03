import gql from 'graphql-tag';

export default gql`
  query productDetails(
    $productId: Int!
    $attributeFilters: AttributeFilterInput
  ) {
    product(id: $productId) {
      id
      classId
      categoryId
      sku
      shortName
      eanCode
      manufacturer
      manufacturerCode
      supplier
      supplierCode
      taxCode
      status
      isOrderable
      orderableFrom
      orderableTo
      unit
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
      bundles {
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
          }
        }
      }
    }
  }
`;
