import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootreducers from "./components/redux/reducers/main";

const middleware = [thunk];

const store = createStore(
    rootreducers,
    applyMiddleware(...middleware)
);

export default store;