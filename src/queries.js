import gql from "graphql-tag";

export const GET_PR_REVIEWS = gql`
  query($queryString: String!) {
    search(query: $queryString, type: ISSUE, first: 100) {
      edges {
        node {
          ... on PullRequest {
            title
            reviews(first: 100) {
              nodes {
                author {
                  login
                }
              }
            }
            comments(first: 100) {
              nodes {
                author {
                  login
                }
              }
            }
            createdAt
          }
        }
      }
    }
  }
`;
