import * as actionTypes from '../actions/actionTypes'

interface stateType {
    users: any,
    userList: any,
    watchUsers: any
}

const initialState: stateType = {
    users: {},
    userList: [],
    watchUsers: {}
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS:
            return {
                ...state,
                users: action.users.data
            };
        case actionTypes.FETCH_USERLIST:
            return {
                ...state,
                userList: action.userList.data
            };
        case actionTypes.FETCH_WATCH_USERS:
            return {
                ...state,
                watchUsers: action.watchUsers.data
            };
        default:
            return state;
    }
}

export default userReducer

