import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { ITask, SelectorProps } from '../../types/types';
import Modal from '../Modal/Modal';
import "./style.css"


const TasksList = () => {
    const { tasks, isModal, editTasks } = useSelector((store: SelectorProps) => store);
    const { saveTasks, saveModalState, saveCurrentTask, saveBtnName } = bindActionCreators(actionCreators, useDispatch());
    const [outputTasks, setOutputTasks] = useState(tasks);
    const [mainCheckState, setMainCheckState] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const tasksLimit = 3;
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(editTasks.length / tasksLimit);

        return new Array(totalPages).fill("").map((el, ind) => ind + 1);
    }, [editTasks.length]);

    useEffect(() => {
        if (editTasks.length) {
            setOutputTasks(editTasks);
        }
    }, [editTasks])

    useEffect(() => {
        const arr = editTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));;
        const mainStatus = arr.every((task: ITask) => task.checked === true);

        setMainCheckState(mainStatus);
    }, [editTasks, currentPage]);

    const openCurenTask = (id: number) => {
        saveCurrentTask(tasks.find((task: ITask) => task.id === id));
        saveModalState(true);
        saveBtnName("Save");
    }

    const handleChangeMainCheckStatus = () => {
        setMainCheckState(!mainCheckState);
        saveTasks(tasks.map((task: ITask, ind: number) =>
            (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit)
                ? ({ ...task, checked: !mainCheckState })
                : task));
    }

    const removeCurrentTask = (id: number) => {
        const question = window.confirm("After press 'Remove' you completely remove your task, are you sure?")

        if (question) {
            const editedTasks = editTasks.filter((task: ITask) => task.id !== id);
            const mainStatus = editedTasks.every((task: ITask) => task.checked === false);

            saveTasks(editedTasks);
            setMainCheckState(mainStatus);
            setCurrentPage(Math.floor(editedTasks.length / tasksLimit));
        }
    }

    const handleChangeTaskChecked = (id: number) => {
        const editedTasks = tasks.map((task: ITask) => task.id === id
            ? { ...task, checked: !task.checked }
            : task);
        const tasksOnPage = editedTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));;
        const mainStatus = tasksOnPage.every((task: ITask) => task.checked === true);

        setMainCheckState(mainStatus);
        saveTasks(editedTasks);
    }

    const handleChangePage = (number: number) => {
        const arr = editTasks.filter((task: ITask, ind: number) => (ind >= (number - 1) * tasksLimit && ind < number * tasksLimit));
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
        if (field === "index") {
            saveTasks(tasks.reverse());
        } else {
            saveTasks(tasks.sort(sortTasks(field)))
        }
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
                    <div onClick={() => handlerSort("index")}>#</div>
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
