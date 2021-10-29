import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../types/types';
import NavTasks from '../components/NavTasks';
import TasksList from '../components/TasksList/TasksList';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';

const MainContent: React.FC = () => {
    const { user } = useSelector((store: IStore) => store)
    const { saveAuthStatus } = bindActionCreators(actionCreators, useDispatch());

    return (
        <div>
            <div className="content__conteiner">
                <button
                    style={{ marginLeft: "auto" }}
                    className="href__button"
                    onClick={() => saveAuthStatus(false)}
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

export default MainContent
