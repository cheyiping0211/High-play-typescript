import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
// import { ApolloLink } from "apollo-link";
import { userResponse } from "../interfaces";
import { GET_USER_FIND, GET_USER_LIST } from "./queries";

export default class GraphQl {
    public client: ApolloClient<unknown>;

    constructor() {
        const httpLink = createHttpLink({
            uri: "http://192.168.244.128:5000/graphql",
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
        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
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
        console.log(res.data.findOneUser, 'findUser');
        return res.data.findOneUser;
    };

    getUserList = async (): Promise<userResponse> => {
        const res = await this.client.query({
            query: GET_USER_LIST,
        });
        return res.data.findUsers;
    };
}