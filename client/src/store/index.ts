import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
//Reducers
import userReducer from "./reducers/user";
let options;
let middlewares;

const rootReducer = combineReducers({
    user: userReducer,
});

middlewares = [logger, thunk];
options = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, options);

export default store;