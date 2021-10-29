import { IS_REMOVE_BTN } from "../constans"

interface IAuth {
    type: string,
    payload: boolean
}

const reducer = (state = false , action: IAuth) => {
    switch (action.type) {
        case IS_REMOVE_BTN: 
            return action.payload
        default:
            return state;
    }
}

export default reducer;