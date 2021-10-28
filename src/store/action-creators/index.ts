import { Dispatch } from "redux";
import { TASKS_TYPE, CURRENT_TASK_TYPE, MODAL_TYPE, BTN_NAME_TYPE, EDIT_TASKS_REDUCER } from "../constans";

export const saveTasks = (tasks: any[]) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: TASKS_TYPE,
            payload: tasks
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

export const saveEtidTasks = (array: any) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: EDIT_TASKS_REDUCER,
            payload: array
        })
    }
}

