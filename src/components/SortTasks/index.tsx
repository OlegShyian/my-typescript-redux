import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { IStore, ITask } from '../../types/types';
import "./style.css"

interface ITitleProps {
    setOutputTasks: (arg: any[]) => void;
    mainCheckState: boolean;
    setMainCheckState: (arg: boolean) => void;
    currentPage: number;
    tasksLimit: number;
} 

const TasksListTitle: React.FC<ITitleProps> = ({
    setMainCheckState,
    mainCheckState,
    setOutputTasks,
    currentPage,
    tasksLimit }) => {

    const { user } = useSelector((store: IStore) => store);
    const { saveUserTasks } = bindActionCreators(actionCreators, useDispatch());
    const [sortDirName, setSortDirName] = useState(1);
    const [sortDirStatus, setSortDirStatus] = useState(1);

    const handleChangeMainCheckStatus = () => {
        setMainCheckState(!mainCheckState);
        saveUserTasks({
            ...user,
            tasks: user.tasks.map((task: ITask, ind: number) =>
                (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit)
                    ? ({ ...task, checked: !mainCheckState })
                    : task)
        });
    }

    const sortTasks = (field: string) => {
        let dir = 1;
        if (field === "name") {
            dir = sortDirName;
            setSortDirName(sortDirName * -1);
        }
        if (field === "status") {
            dir = sortDirStatus;
            setSortDirStatus(sortDirStatus * -1);
        }

        return (a: any, b: any) => {
            if (a[field] > b[field]) return 1 * dir;
            if (a[field] < b[field]) return -1 * dir;
            return 0;
        }
    }

    const handlerSort = (field: string) => {
        setOutputTasks(user.tasks.sort(sortTasks(field)));
        saveUserTasks({ ...user, tasks: user.tasks.sort(sortTasks(field)) });
    }
    
    return (
        <>
            <li className="list__titles">
                <div className="title__first__element">
                    <input
                        type="checkbox"
                        checked={mainCheckState}
                        onChange={handleChangeMainCheckStatus}
                    />
                </div>
                <div>#</div>
                <div
                    className="title_name"
                    onClick={() => handlerSort("name")}
                >Task Name</div>
                <div
                    className="title_status"
                    onClick={() => handlerSort("status")}
                >Status</div>
                <div>Edit</div>
                <div>Remove</div>
            </li>

        </>
    )
}

export default TasksListTitle
