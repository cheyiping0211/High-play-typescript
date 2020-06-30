import { Dispatch } from "redux";
import * as actionTypes from "./actionTypes";
import GraphQlApi from "../../services/graphqlApis";
import { userResponse } from "../../interfaces";

const graphQlRequest = new GraphQlApi();

export function get_users(id: number) {

    function success(user: userResponse) {
        return { type: actionTypes.userConstants.FETCH_USER_SUCCESS, user };
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

    function success(user: userResponse) {
        return { type: actionTypes.userConstants.FETCH_USER_SUCCESS, user };
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
