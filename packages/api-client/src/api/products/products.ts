import gql from 'graphql-tag';

export default gql`
  query products(
    $slug: String
    $offset: Int = 12
    $page: Int = 1
    $sort: [SortInput!]
    $textFilters: [TextFilterInput!]
    $attributeFilters: AttributeFilterInput
    $hasBundle: YesNo
    $isBundleLeader: YesNo
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
      products(
        offset: $offset
        page: $page
        sort: $sort
        textFilters: $textFilters
        hasBundle: $hasBundle
        isBundleLeader: $isBundleLeader
      ) {
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
          sku
          path
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
            language
            value
          }
          ... on Product {
            id
            classId
            shortName
            manufacturerCode
            eanCode
            manufacturer
            supplier
            supplierCode
            class
            status
            isOrderable
            orderableFrom
            orderableTo
            images(siteId: 1) {
              id
              imageId
              name
              url(fillColor: "white", method: fill, height: 800, width: 800)
              type
              order
            }
            price {
              gross
              net
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
            inventory {
              totalQuantity
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
                    url(
                      fillColor: "white"
                      method: fill
                      height: 800
                      width: 800
                    )
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
        }
      }
    }
  }
`;
