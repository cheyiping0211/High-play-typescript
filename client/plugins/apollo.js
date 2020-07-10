import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { split, ApolloLink } from "apollo-link";
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';

export default ctx => {
    const httpLink = createHttpLink({
        uri: "http://192.168.244.128:3000/graphql",
    });
    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem("access_token");
        return {
            headers: {
                ...headers,
                authorization: token ? token : null,
            },
        };
    });

    const linkError = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
        uri: `ws://192.168.244.128:3000/graphql`,
        options: {
            reconnect: true,
        }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const terminatingLink = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    const link = ApolloLink.from([linkError, authLink, terminatingLink]);

    return {
        link: link,
        cache: new InMemoryCache({
            dataIdFromObject: object => {
                switch (object.__typename) {
                    default: return defaultDataIdFromObject(object); // fall back to default handling
                }
            }
        }),
        defaultHttpLink: false, // this should do the trick
    }
}