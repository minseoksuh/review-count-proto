import { ApolloProvider } from "@apollo/react-hooks";
import Wrapper from "./Wrapper";
import { createClient } from "./client";

function App() {
  const client = createClient();

  return (
    <ApolloProvider client={client}>
      <Wrapper />
    </ApolloProvider>
  );
}

export default App;
