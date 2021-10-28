import {combineReducers} from "redux"
import tasksReducer from "./tasksReducer"
import modalReducer from "./modalReducer"
import taskReducer from "./taskReducer"
import btnNameReducer from "./btnNameReducer"
import editTasksReducer from "./editTasksReducer"

const reducers = combineReducers({
    tasks: tasksReducer,
    isModal: modalReducer,
    currentTask: taskReducer,
    btnName: btnNameReducer,
    editTasks: editTasksReducer
});


export default reducers;