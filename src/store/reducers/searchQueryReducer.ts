import { SEARCH_QUERY_TYPE } from "../constans"

interface ISearch {
    type: string,
    payload: string
}



const reducer = (state ="" , action: ISearch) => {
    switch (action.type) {
        case SEARCH_QUERY_TYPE: 
            return action.payload
        default:
            return state;
    }
}

export default reducer;