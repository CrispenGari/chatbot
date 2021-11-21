import "../styles/globals.css";
import Layout from "../components/Layout/Layout";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
const App = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};
export default App;
