import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";
import Wrapper from "./Wrapper";

function App() {
  return (
    <ApolloProvider client={client}>
      <Wrapper />
    </ApolloProvider>
  );
}

export default App;
