import { Modal } from "../../types/types";
import { MODAL_TYPE } from "../constans";

const reducer = (state = false, action: Modal) => {
    switch (action.type) {
        case MODAL_TYPE:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;