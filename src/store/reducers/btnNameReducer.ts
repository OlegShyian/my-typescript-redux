import { BtnName } from "../../types/types";
import { BTN_NAME_TYPE } from "../constans";

const reducer = (state = "", action: BtnName) => {
    switch (action.type) {
        case BTN_NAME_TYPE:
            return action.payload
        default:
            return state;
    }
}

export default reducer;