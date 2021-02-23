import ApolloClient from "apollo-boost";

export const createClient = () => {
  const PAK = process.env.REACT_APP_GITHUB_KEY;

  const cleanPAK = PAK.replace("min", "");

  return new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer ${cleanPAK}`,
    },
    service: {
      name: "github",
      url: "https://api.github.com/graphql",
      // optional headers
      headers: {
        authorization: `bearer ${cleanPAK}`,
      },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  });
};

// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql",
//   headers: {
//     Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`,
//   },
//   service: {
//     name: "github",
//     url: "https://api.github.com/graphql",
//     // optional headers
//     headers: {
//       authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`,
//     },
//     // optional disable SSL validation check
//     skipSSLValidation: true,
//   },
// });

// export default client;
