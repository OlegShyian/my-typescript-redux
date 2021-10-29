export interface ITask {
    name: string;
    status: string;
    id: number;
    checked: boolean;
}

export interface IStore {
    user: IUser,
    isModal: boolean,
    currentTask: ITask,
    btnName: string,
    isAuth: boolean
}

export interface IUser {
    tasks: any[];
    name: string;
    password: string;
} 

export interface SelectorProps {
    user: IUser;
    currentTask: ITask;
    btnName: string;
    isModal: boolean;
    searchQuery: string;
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
    payload: IUser
}