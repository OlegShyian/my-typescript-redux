import { ITaskReducer } from "../../types/types";
import { CURRENT_TASK_TYPE } from "../constans";

const reducer = (state = {}, action: ITaskReducer) => {
    switch (action.type) {
        case CURRENT_TASK_TYPE:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;