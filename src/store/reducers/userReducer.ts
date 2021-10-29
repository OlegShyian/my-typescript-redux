import { ITasksReducer } from "../../types/types";
import { USER_TYPE } from "../constans";

const reducer = (state = {}, action: ITasksReducer) => {
    switch (action.type) {
        case USER_TYPE:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
