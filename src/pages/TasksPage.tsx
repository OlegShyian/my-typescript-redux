import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../types/types';
import NavTasks from '../components/NavTasks';
import TasksList from '../components/TasksList';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';

const TasksPage: React.FC = () => {
    const { user } = useSelector((store: IStore) => store)
    const { saveAuthStatus, } = bindActionCreators(actionCreators, useDispatch());

    const logOff = () => {
        saveAuthStatus(false);
    }

    return (
        <div>
            <div className="content__conteiner">
                <button
                    style={{ marginLeft: "auto" }}
                    className="href__button"
                    onClick={logOff}
                >log off</button>
                <NavTasks />
                {user.tasks.length
                    ?
                    <TasksList />
                    :
                    <h1 style={{ textAlign: "center" }}>Завдань немає</h1>
                }
            </div>
        </div>
    )
}

export default TasksPage
