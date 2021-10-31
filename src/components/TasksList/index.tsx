import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { IStore, ITask } from '../../types/types';
import Modal from '../Modal/Modal';
import "./style.css"
import TasksPagination from '../TasksPaginations';
import TasksListTitle from '../SortTasks';


const TasksList: React.FC = () => {
    const {
        saveUserTasks,
        saveModalState,
        saveCurrentTask,
        saveBtnName } = bindActionCreators(actionCreators, useDispatch());
    const { user, isModal, searchQuery } = useSelector((store: IStore) => store);
    const [outputTasks, setOutputTasks] = useState(user.tasks);
    const [mainCheckState, setMainCheckState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksLimit, setTasksLimit] = useState(3);

    useEffect(() => {
        const result = user.tasks.filter((task: ITask) => task.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setOutputTasks(result);
        if (searchQuery) {
            setCurrentPage(1);
        }
    }, [user.tasks, searchQuery, setOutputTasks])

    useEffect(() => {
        if (outputTasks.length) {
            const arr = outputTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));;
            const calcMainStatus = arr.every((task: ITask) => task.checked === true);
            setMainCheckState(calcMainStatus);
        }
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
        if (currentPage > user.tasks.length / tasksLimit) {
            setCurrentPage(Math.ceil(user.tasks.length / tasksLimit));
        }
    }, [currentPage, user.tasks.length])

    const openCurenTask = (id: number) => {
        saveCurrentTask(user.tasks.find((task: ITask) => task.id === id));
        saveModalState(true);
        saveBtnName("Save");
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


    return (
        <>
            {isModal
                ?
                <Modal />
                : null
            }
            <ul>
                <TasksListTitle
                    setMainCheckState={setMainCheckState}
                    mainCheckState={mainCheckState}
                    setOutputTasks={setOutputTasks}
                    currentPage={currentPage}
                    tasksLimit={tasksLimit}
                />
                <hr className="wrapper_hr" />
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
            <TasksPagination
                outputTasks={outputTasks}
                tasksLimit={tasksLimit}
                setTasksLimit={setTasksLimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default TasksList
