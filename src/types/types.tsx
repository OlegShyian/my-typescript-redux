export interface ITask {
    name: string;
    status: string;
    id: number;
    checked: boolean;
}

export interface IStore {
    tasks: any[],
    isModal: boolean,
    currentTask: ITask,
    btnName: string
}

export interface SelectorProps {
    tasks: any[];
    currentTask: ITask;
    btnName: string;
    isModal: boolean;
    editTasks: any[];
}

export interface BtnName {
    type: string,
    payload: string | null
}

export interface Modal {
    type: string,
    payload: boolean
}

export interface ITaskReducer {
    type: string,
    payload: ITask
}

export interface ITasksReducer {
    type: string,
    payload: any[]
}