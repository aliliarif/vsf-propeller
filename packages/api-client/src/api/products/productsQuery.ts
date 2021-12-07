import gql from 'graphql-tag';

export default gql`
  query productsList($categoryId: Int) {
    products(categoryId: $categoryId) {
      items {
        name {
          value
        }
        ... on Product {
          classId
          price {
            value
          }
          images(siteId: 1) {
            id
            imageId
            name
            url(fillColor: "white", method: fill, height: 400, width: 400)
          }
        }
      }
    }
  }
`;
