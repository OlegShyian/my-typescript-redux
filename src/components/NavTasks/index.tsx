import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { IStore, ITask } from '../../types/types';
import Modal from '../Modal/Modal';
import './style.css';

interface IRemove {
    remove: string[];
    saved: ITask[];
}

const NavTasks: React.FC = () => {
    const { isModal, user, isRemoveBtn } = useSelector((store: IStore) => store);
    const [searchQuery, setSearchQuery] = useState('');
    const { saveUserTasks, saveModalState, saveBtnName, saveSearchQuery, saveRemoveStatusBtn } = bindActionCreators(actionCreators, useDispatch());

    useEffect(() => {
        const timer = setTimeout(() => {
            saveSearchQuery(searchQuery);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchQuery, user.tasks, saveSearchQuery]);

    useEffect(() => {
        const isRemove = user.tasks.some((task: ITask) => task.checked);
        saveRemoveStatusBtn(isRemove);
    }, [user.tasks, saveRemoveStatusBtn]);

    const handleRemoveAllChecked = () => {
        const { remove, saved } = user.tasks.reduce(
            (accum: IRemove, task: ITask) => (task.checked ? { ...accum, remove: [...accum.remove, task.name] } : { ...accum, saved: [...accum.saved, task] }),
            { remove: [], saved: [] }
        );

        const question = window.confirm(`After press 'OK' you completely remove your tasks: { ${remove} }, are you sure?`);

        if (question) {
            saveUserTasks({ ...user, tasks: saved });
            const save = {
                [user.name]: { password: user.password, tasks: saved },
            };
            const getUsers = localStorage.getItem('users') || '{}';
            const users = JSON.parse(getUsers);
            localStorage.setItem('users', JSON.stringify({ ...users, ...save }));
        }
    };

    return (
        <div className="wrapper__tasks_navigation">
            <div>
                {isRemoveBtn ? (
                    <button onClick={handleRemoveAllChecked} className="remove__button">
                        remove &#10004;
                    </button>
                ) : null}
            </div>
            <div className="tasks__navigation">
                {isModal ? <Modal /> : null}
                <input type="text" placeholder="Search in the tasks..." onChange={(e) => setSearchQuery(e.target.value)} />
                <button
                    className="btn__addTask"
                    onClick={() => {
                        saveModalState(true);
                        saveBtnName('Create');
                    }}
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default NavTasks;
