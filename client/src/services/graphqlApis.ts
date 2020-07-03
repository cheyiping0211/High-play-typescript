import { ApolloClient } from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
import { split, ApolloLink } from "apollo-link";
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { userResponse } from "../interfaces";
import { GET_USER_FIND, WATCH_USERS, GET_USER_LIST } from "./queries";

export default class GraphQl {
    public client: ApolloClient<unknown>;

    constructor() {
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

        const link = ApolloLink.from([authLink, terminatingLink]);

        const client = new ApolloClient({
            link: link,
            cache: new InMemoryCache({
                dataIdFromObject: object => {
                    switch (object.__typename) {
                        default: return defaultDataIdFromObject(object); // fall back to default handling
                    }
                }
            }),
        });
        this.client = client;
    }

    getUsers = async (id: number): Promise<any> => {
        const res = await this.client.query({
            query: GET_USER_FIND,
            variables: {
                id,
            },
        });
        return res.data.findOneUser;
    };

    getUserList = async (): Promise<userResponse> => {
        const res = await this.client.query({
            query: GET_USER_LIST,
        });
        return res.data.findUsers;
    };

    watchUsers = async (): Promise<any> => {
        const res = await this.client.subscribe({
            query: WATCH_USERS,
        });
        return res;
        // return res.data.watchUsers || {};
    }
}