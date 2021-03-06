import gql from 'graphql-tag';

export default gql`
  query productDetails(
    $productId: Int!
    $attributeFilters: AttributeFilterInput
    $crossupsellTypesInput: CrossupsellTypesInput
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
      unit
      name {
        value
        language
      }
      slug {
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
        discount
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
      crossupsells(input: $crossupsellTypesInput) {
        type
        subtype
        product {
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
          status
          isOrderable
          unit
          name {
            value
            language
          }
          slug {
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
            }
            taxCode
            type
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
      inventory {
        totalQuantity
      }
    }
  }
`;
