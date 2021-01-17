import gql from "graphql-tag";

export const GET_PR_REVIEWS = gql`
  query {
    search(
      query: "repo:meshkorea/vroong-tms-manager-web is:pr created:>=2021-01-01"
      type: ISSUE
      first: 100
    ) {
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
    # repository(owner: $owner, name: $name) {
    #   pullRequests(first: 10, after: "2021-01-01") {
    #     nodes {
    #       bodyText
    #       comments(first: 100) {
    #         nodes {
    #           author {
    #             login
    #           }
    #           bodyText
    #         }
    #       }
    #     }
    #   }
    # }
  }
`;
