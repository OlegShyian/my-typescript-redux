import { ITask, ITasksReducer } from "../../types/types";
import { TASKS_TYPE } from "../constans";

const reducer = (state = [], action: ITasksReducer) => {
    switch (action.type) {
        case TASKS_TYPE:
            return [...action.payload];
        default:
            return state;
    }
}

export default reducer;
