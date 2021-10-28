import { applyMiddleware, createStore } from "redux"
import reducers from "./reducers";
import trunk from 'redux-thunk';

export const store = createStore(
    reducers,
    {},
    applyMiddleware(trunk)
)