import gql from 'graphql-tag';

export default gql`
  query products(
    $slug: String
    $offset: Int = 12
    $page: Int = 1
    $textFilters: [TextFilterInput!]
    $attributeFilters: AttributeFilterInput
  ) {
    category(slug: $slug) {
      id
      categoryId
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
      slug {
        value
        language
      }
      defaultLanguage
      products(offset: $offset, page: $page, textFilters: $textFilters) {
        itemsFound
        offset
        page
        pages
        start
        end
        availableAttributes {
          id
          isSearchable
          description
          type
          textFilter {
            value
            count
          }
        }
        items {
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
          ... on Product {
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
            manufacturerCode
            eanCode
            manufacturer
            supplier
            supplierCode
            originalPrice
            costPrice
            suggestedPrice
            storePrice
            creditPoints
            minimumQuantity
            unit
            purchaseUnit
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
    }
  }
`;
