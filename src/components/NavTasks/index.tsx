import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { SelectorProps } from '../../types/types';
import Modal from '../Modal/Modal';
import "./style.css"

const NavTasks = () => {
    const { isModal , user} = useSelector((store: SelectorProps) => store);
    const [searchQuery, setSearchQuery] = useState("");
    const { saveModalState, saveBtnName, saveSearchQuery } = bindActionCreators(actionCreators, useDispatch());

    useEffect(() => {
        const timer = setTimeout(() => {
            saveSearchQuery(searchQuery);
        }, 1000)
        return () => clearTimeout(timer);
    }, [searchQuery, user.tasks], );

    return (
        <div className="tasks__navigation">
            {isModal ? <Modal /> : null}
            <input
                type="text"
                placeholder="Seach in the tasks..."
                onChange={(e) => setSearchQuery(e.target.value)}
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
