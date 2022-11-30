import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const uri = process.env.NODE_ENV == "production" ? "http://localhost:6969/api/graphql" : "http://localhost:3000/api/graphql"

const link = createHttpLink({
    uri: uri,
    credentials: 'include'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

export default client