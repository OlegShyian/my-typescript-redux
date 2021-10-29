import {combineReducers} from "redux"
import modalReducer from "./modalReducer"
import taskReducer from "./taskReducer"
import btnNameReducer from "./btnNameReducer"
import searchQueryReducer from "./searchQueryReducer"
import authReducer from "./authReducer"
import userReducer from "./userReducer"
import isRemoveBtn from "./removeBtnReducer"

const reducers = combineReducers({
    user: userReducer,
    isModal: modalReducer,
    currentTask: taskReducer,
    btnName: btnNameReducer,
    searchQuery: searchQueryReducer,
    isAuth: authReducer,
    isRemoveBtn: isRemoveBtn,
});


export default reducers;