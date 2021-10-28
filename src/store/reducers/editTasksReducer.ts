import { EDIT_TASKS_REDUCER } from "../constans"

interface ISearch {
    type: string,
    payload: string
}



const reducer = (state = [], action: ISearch) => {
    switch (action.type) {
        case EDIT_TASKS_REDUCER: 
            return action.payload
        default:
            return state;
    }
}

export default reducer;