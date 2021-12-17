import gql from 'graphql-tag';

export default gql`
  query categories($categoryId: Float) {
    category(id: $categoryId) {
      name {
        value
        language
      }
      slug {
        value
        language
      }
      categories {
        name {
          value
          language
        }
        slug {
          value
          language
        }
        categories {
          name {
            value
            language
          }
          slug {
            value
            language
          }
        }
      }
    }
  }
`;
