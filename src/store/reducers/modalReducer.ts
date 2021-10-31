import { Modal } from "../../types/types";
import { IS_MODAL_TYPE } from "../constans";

const reducer = (state = false, action: Modal) => {
    switch (action.type) {
        case IS_MODAL_TYPE:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;