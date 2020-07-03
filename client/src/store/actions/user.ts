import { Dispatch } from "redux";
import * as actionTypes from "./actionTypes";
import GraphQlApi from "../../services/graphqlApis";
import { userResponse } from "../../interfaces";

const graphQlRequest = new GraphQlApi();

export function get_users(id: number) {

    function success(users: userResponse) {
        return { type: actionTypes.FETCH_USERS, users };
    }

    return async (dispatch: Dispatch) => {
        try {
            const users = await graphQlRequest.getUsers(id);
            dispatch(success(users));
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

export function get_userList() {

    function success(userList: userResponse) {
        return { type: actionTypes.FETCH_USERLIST, userList };
    }

    return async (dispatch: Dispatch) => {
        try {
            const userList = await graphQlRequest.getUserList();
            dispatch(success(userList));
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

export function watch_users() {

    function success(watchUsers) {
        return { type: actionTypes.FETCH_WATCH_USERS, watchUsers };
    }

    return async (dispatch: Dispatch) => {
        try {
            const watchUsers = await graphQlRequest.watchUsers();
            dispatch(success(watchUsers));
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}
