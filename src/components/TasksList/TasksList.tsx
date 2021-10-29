import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { ITask, SelectorProps } from '../../types/types';
import Modal from '../Modal/Modal';
import "./style.css"


const TasksList = () => {
    const { user, isModal, searchQuery } = useSelector((store: SelectorProps) => store);
    const tasks = user.tasks;
    const { saveUserTasks, saveModalState, saveCurrentTask, saveBtnName } = bindActionCreators(actionCreators, useDispatch());
    const [outputTasks, setOutputTasks] = useState(tasks);
    const [mainCheckState, setMainCheckState] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const tasksLimit = 3;
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(outputTasks.length / tasksLimit);

        return new Array(totalPages).fill("").map((el, ind) => ind + 1);
    }, [outputTasks]);

    useEffect(() => {
        const result = tasks.filter((task: ITask) => task.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setOutputTasks(result);
        if (searchQuery) {
            setCurrentPage(Math.ceil(result.length / tasksLimit));
        }
    }, [tasks, searchQuery])

    useEffect(() => {
        const arr = outputTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));;
        const mainStatus = arr.every((task: ITask) => task.checked === true);

        setMainCheckState(mainStatus);
    }, [outputTasks, currentPage]);

    useEffect(() => {
        const save = {
            [user.name]: { password: user.password, tasks: user.tasks }
        }
        const getUsers = localStorage.getItem("users") || "{}";
        const users = JSON.parse(getUsers);
        localStorage.setItem("users", JSON.stringify({ ...users, ...save }));
    }, [user]);

    const openCurenTask = (id: number) => {
        saveCurrentTask(tasks.find((task: ITask) => task.id === id));
        saveModalState(true);
        saveBtnName("Save");
    }

    const handleChangeMainCheckStatus = () => {
        setMainCheckState(!mainCheckState);
        saveUserTasks({
            ...user,
            tasks: tasks.map((task: ITask, ind: number) =>
                (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit)
                    ? ({ ...task, checked: !mainCheckState })
                    : task)
        });
    }

    const removeCurrentTask = (id: number) => {
        const question = window.confirm("After press 'Remove' you completely remove your task, are you sure?")

        if (question) {
            const editedTasks = outputTasks.filter((task: ITask) => task.id !== id);
            const mainStatus = editedTasks.every((task: ITask) => task.checked === false);

            saveUserTasks({ ...user, tasks: editedTasks });
            setMainCheckState(mainStatus);
            setCurrentPage(Math.ceil(editedTasks.length / tasksLimit));
        }
    }

    const handleChangeTaskChecked = (id: number) => {
        const editedTasks = tasks.map((task: ITask) => task.id === id
            ? { ...task, checked: !task.checked }
            : task);
        const tasksOnPage = editedTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));;
        const mainStatus = tasksOnPage.every((task: ITask) => task.checked === true);

        setMainCheckState(mainStatus);
        saveUserTasks({ ...user, tasks: editedTasks });
    }

    const handleChangePage = (number: number) => {
        const arr = outputTasks.filter((task: ITask, ind: number) => (ind >= (number - 1) * tasksLimit && ind < number * tasksLimit));
        const mainStatus = arr.every((task: ITask) => task.checked === true);

        setCurrentPage(number);
        setMainCheckState(mainStatus);
    }


    const sortTasks = (field: string) => {
        return (a: any, b: any) => {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
            return 0;
        }
    }

    const handlerSort = (field: string) => {
        setOutputTasks(tasks.sort(sortTasks(field)));
        saveUserTasks({ ...user, tasks: tasks.sort(sortTasks(field)) });
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
                    <div>
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
        </>
    )
}

export default TasksList
