import { IS_AUTH_TYPE } from "../constans"

interface IAuth {
    type: string,
    payload: boolean
}

const reducer = (state = false , action: IAuth) => {
    switch (action.type) {
        case IS_AUTH_TYPE: 
            return action.payload
        default:
            return state;
    }
}

export default reducer;