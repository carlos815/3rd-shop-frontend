import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({
    uri: "http://localhost:3000/api/graphql",
    credentials: 'include'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

export default client