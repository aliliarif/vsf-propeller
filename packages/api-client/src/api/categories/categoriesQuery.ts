import gql from 'graphql-tag';

export default gql`
  query categoryList {
    category(id: 100092) {
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
`;
