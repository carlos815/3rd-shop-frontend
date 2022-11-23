import { ApolloProvider, } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Page from "../components/Page"
import { NavStateProvider } from "../lib/navStateProvider"
import NProgress from 'nprogress';
// import withData from '../lib/withData';




import "../styles/globals.css";
import { Router } from "next/router";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-purple flex flex-col justify-between">
      <ApolloProvider client={client}>
        <NavStateProvider>
          <Header />
          <Page>
            <Component {...pageProps} />
          </Page>
          <Footer />
        </NavStateProvider>
      </ApolloProvider>
    </div>
  );
}

// MyApp.getInitialProps = async function ({ Component, ctx }) {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   pageProps.query = ctx.query;
//   return { pageProps };
// };



export default MyApp;
