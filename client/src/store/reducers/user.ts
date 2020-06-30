import * as actionTypes from '../actions/actionTypes'

interface stateType {
    users: any,
    userList: any,
}

const initialState: stateType = {
    users: {},
    userList: []
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.userConstants.FETCH_USER_SUCCESS:
            return {
                ...state,
                users: action.user.data
            };
        default:
            return state;
    }
}

export default userReducer

