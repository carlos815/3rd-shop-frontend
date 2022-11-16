import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/Header"
import Footer from "../components/Footer"


import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </ApolloProvider>
  );
}

export default MyApp;