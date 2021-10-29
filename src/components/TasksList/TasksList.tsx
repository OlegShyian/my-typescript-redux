import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { IStore, ITask } from '../../types/types';
import Modal from '../Modal/Modal';
import "./style.css"


const TasksList: React.FC = () => {
    const { user, isModal, searchQuery } = useSelector((store: IStore) => store);
    const { saveUserTasks, saveModalState, saveCurrentTask, saveBtnName, saveRemoveStatusBtn } = bindActionCreators(actionCreators, useDispatch());
    const [outputTasks, setOutputTasks] = useState(user.tasks);
    const [mainCheckState, setMainCheckState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksLimits: any[] = [3, 5, 10];
    const [tasksLimit, setTasksLimit] = useState(tasksLimits[0]);
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(outputTasks.length / tasksLimit);
        return new Array(totalPages).fill("").map((el, ind) => ind + 1);
    }, [outputTasks, tasksLimit]);
    const [sortDirName, setSortDirName] = useState(1);
    const [sortDirStatus, setSortDirStatus] = useState(1);

    useEffect(() => {
        const result = user.tasks.filter((task: ITask) => task.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setOutputTasks(result);
        if (searchQuery) {
            setCurrentPage(1);
        }
    }, [user.tasks, searchQuery, setOutputTasks])

    useEffect(() => {
        const arr = outputTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));;
        const calcMainStatus = arr.every((task: ITask) => task.checked === true);

        setMainCheckState(calcMainStatus);
    }, [outputTasks, currentPage, tasksLimit]);

    useEffect(() => {
        const save = {
            [user.name]: { password: user.password, tasks: user.tasks }
        }
        const getUsers = localStorage.getItem("users") || "{}";
        const users = JSON.parse(getUsers);
        localStorage.setItem("users", JSON.stringify({ ...users, ...save }));
    }, [user]);


    useEffect(() => {
        const isRemove = user.tasks.some((task:ITask) => task.checked);
        saveRemoveStatusBtn(isRemove);
    },[user.tasks, saveRemoveStatusBtn])

    useEffect(() => {
        if(currentPage > user.tasks.length/tasksLimit){
            setCurrentPage(Math.ceil(user.tasks.length/tasksLimit));
        }
    },[currentPage, user.tasks.length])

    const openCurenTask = (id: number) => {
        saveCurrentTask(user.tasks.find((task: ITask) => task.id === id));
        saveModalState(true);
        saveBtnName("Save");
    }

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

    const removeCurrentTask = (id: number) => {
        const question = window.confirm("After press 'Remove' you completely remove your task, are you sure?")

        if (question) {
            const editedTasks = outputTasks.filter((task: ITask) => task.id !== id);
            const calcMainStatus = editedTasks.every((task: ITask) => task.checked === false);

            saveUserTasks({ ...user, tasks: editedTasks });
            setMainCheckState(calcMainStatus);
            setCurrentPage(Math.ceil(editedTasks.length / tasksLimit));
        }
    }

    const handleChangeTaskChecked = (id: number) => {
        const editedTasks = user.tasks.map((task: ITask) => task.id === id
            ? { ...task, checked: !task.checked }
            : task);
        const tasksOnPage = editedTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));
        const calcMainStatus = tasksOnPage.every((task: ITask) => task.checked === true);

        setMainCheckState(calcMainStatus);
        saveUserTasks({ ...user, tasks: editedTasks });
    }

    const handleChangePage = (number: number) => {
        const arr = outputTasks.filter((task: ITask, ind: number) => (ind >= (number - 1) * tasksLimit && ind < number * tasksLimit));
        const calcMainStatus = arr.every((task: ITask) => task.checked === true);

        setCurrentPage(number);
        setMainCheckState(calcMainStatus);
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


    const handleSetLimit = (limit: number) => {
        if (currentPage > outputTasks.length / limit) {
            setCurrentPage(Math.ceil(outputTasks.length / limit));
        }
        setTasksLimit(limit);
    }

    return (
        <>
            {isModal
                ?
                <Modal />
                : null
            }
            <ul>
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
                        className="second__element"
                        onClick={() => handlerSort("name")}
                    >Task Name</div>
                    <div onClick={() => handlerSort("status")}>Status</div>
                    <div>Edit</div>
                    <div>Remove</div>
                </li>
                <hr style={{ margin: "5px 10px", background: "black" }} />
                {outputTasks.map((task: ITask, ind: number) =>
                    (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit)
                        ?
                        <li key={ind} className="list__titles">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.checked}
                                    onChange={() => handleChangeTaskChecked(task.id)}

                                />
                            </div>
                            <div>{ind + 1}</div>
                            <div className="second__element">{task.name}</div>
                            <div>{task.status}</div>
                            <div>
                                <button
                                    onClick={() => openCurenTask(task.id)}
                                >Edit</button>
                            </div>
                            <div><button
                                onClick={() => removeCurrentTask(task.id)}
                            >Remove</button></div>
                        </li>
                        :
                        null)}
            </ul>
            <div className="wrapper__pagination">
                <div className="page__conteiner">
                    {pageNumbers.map(currentPage =>
                        <span
                            key={currentPage}
                            className="page"
                            onClick={() => handleChangePage(currentPage)}
                        >
                            {currentPage}
                        </span>
                    )}
                </div>
                <div className="tasks__limit">
                    {tasksLimits.map((limit: number, ind) =>
                        <button
                            key={ind}
                            className="pagination__numbers"
                            onClick={() => handleSetLimit(limit)}
                        >{limit}</button>
                    )}

                </div>
            </div>
        </>
    )
}

export default TasksList
