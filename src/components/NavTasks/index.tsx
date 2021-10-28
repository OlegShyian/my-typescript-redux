import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { ITask, SelectorProps } from '../../types/types';
import Modal from '../Modal/Modal';
import "./style.css"

const NavTasks = () => {
    const { isModal , tasks} = useSelector((store: SelectorProps) => {
        console.log(store);
        return store;
    });
    const [searchResult, setSearchResult] = useState("");
    const { saveModalState, saveBtnName, saveEtidTasks } = bindActionCreators(actionCreators, useDispatch());

    useEffect(() => {
        const timer = setTimeout(() => {
            const editTasks = tasks.filter((task: ITask) => task.name.toLowerCase().includes(searchResult.toLowerCase()));
            saveEtidTasks(editTasks);
        }, 1000)
        return () => clearTimeout(timer);
    }, [searchResult, tasks], );

    return (
        <div className="tasks__navigation">
            {isModal ? <Modal /> : null}
            <input
                type="text"
                placeholder="Seach in the tasks..."
                onChange={(e) => setSearchResult(e.target.value)}
            />
            <button
                className="btn__addTask"
                onClick={() => {
                    saveModalState(true);
                    saveBtnName("Create");
                }}
            >Add Task</button>
        </div>
    )
}

export default NavTasks
