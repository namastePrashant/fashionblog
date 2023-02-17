import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
const GQL_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const defaultOptions: any = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
};

const cache = new InMemoryCache({
    resultCaching: false,
});

const link = createHttpLink({
    uri: GQL_API,
});

const client: any = new ApolloClient({
    link,
    cache,
    defaultOptions,
});

export default client;
