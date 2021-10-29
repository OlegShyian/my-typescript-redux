import { Dispatch } from "redux";
import { IUser } from "../../types/types";
import { USER_TYPE, CURRENT_TASK_TYPE, MODAL_TYPE, BTN_NAME_TYPE, SEARCH_QUERY_TYPE, IS_AUTH_TYPE, IS_REMOVE_BTN } from "../constans";

export const saveUserTasks = (user: IUser ) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: USER_TYPE,
            payload: user
        })
    }
}


export const saveCurrentTask = (task: any) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: CURRENT_TASK_TYPE,
            payload: task
        })
    }
}

export const saveModalState = (isModal: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: MODAL_TYPE,
            payload: isModal
        })
    }
}

export const saveBtnName = (name: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: BTN_NAME_TYPE,
            payload: name
        })
    }
}

export const saveSearchQuery = (query: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SEARCH_QUERY_TYPE,
            payload: query
        })
    }
}

export const saveAuthStatus = (isAuth: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: IS_AUTH_TYPE,
            payload: isAuth
        })
    }

}
export const saveRemoveStatusBtn = (isRemoveBtn: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: IS_REMOVE_BTN,
            payload: isRemoveBtn
        })
    }
}

