import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`,
  },
  service: {
    name: "github",
    url: "https://api.github.com/graphql",
    // optional headers
    headers: {
      authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`,
    },
    // optional disable SSL validation check
    skipSSLValidation: true,
  },
});

export default client;
