import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer 058587e29892a7cae4d6334251f0b735f1d5fbde`,
  },
  service: {
    name: "github",
    url: "https://api.github.com/graphql",
    // optional headers
    headers: {
      authorization: `bearer 058587e29892a7cae4d6334251f0b735f1d5fbde`,
    },
    // optional disable SSL validation check
    skipSSLValidation: true,
  },
});

export default client;
