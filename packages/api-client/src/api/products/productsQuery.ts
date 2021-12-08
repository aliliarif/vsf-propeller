import gql from 'graphql-tag';

export default gql`
  query category($slug: string) {
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
      products {
        itemsFound
        offset
        page
        pages
        start
        end
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
            manufacturerCode: eanCode
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
            attributes {
              id
              searchId
              description {
                value
                language
              }
              type
              isSearchable
              isPublic
              isHidden
              enumValue
              intValue
              decimalValue
              dateValue
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



// export default gql`
//   query productsList($categoryId: Int) {
//     products(categoryId: $categoryId) {
//       items {
//         name {
//           value
//           language
//         }
//         description {
//           value
//           language
//         }
//         shortDescription {
//           value
//           language
//         }
//         sku
//         categoryId
//         path
//         ... on Product {
//           name {
//             value
//             language
//           }
//           description {
//             value
//             language
//           }
//           shortDescription {
//             value
//             language
//           }
//           sku
//           categoryId
//           path
//           shortName
//           manufacturerCode: eanCode
//           manufacturer
//           supplier
//           supplierCode
//           originalPrice
//           costPrice
//           suggestedPrice
//           storePrice
//           creditPoints
//           minimumQuantity
//           unit
//           purchaseUnit
//           id
//           language
//           class
//           classId
//           images(siteId: 1) {
//             id
//             imageId
//             name
//             url(fillColor: "white", method: fill, height: 800, width: 800)
//             type
//             order
//           }
//           price {
//             value
//             quantity
//             discount {
//               discountId
//               formula
//               type
//               quantity
//               value
//               validFrom
//               validTo
//               hops
//             }
//             taxCode
//             type
//           }
//           attributes {
//             id
//             searchId
//             description {
//               value
//               language
//             }
//             type
//             isSearchable
//             isPublic
//             isHidden
//             enumValue
//             intValue
//             decimalValue
//             dateValue
//             textValue {
//               values
//               language
//             }
//           }
//         }
//       }
//     }
//   }
// `;