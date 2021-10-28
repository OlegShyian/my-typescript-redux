import React from 'react'
import Modal from '../components/Modal/Modal';
import { useSelector } from 'react-redux';
import { SelectorProps } from '../types/types';
import NavTasks from '../components/NavTasks';
import TasksList from '../components/TasksList/TasksList';

const MainContent: React.FC = () => {
    const {  editTasks } = useSelector((store: SelectorProps) => store);

    return (
        <div className="content__conteiner">
            <NavTasks />
            {editTasks.length
                ?
                <TasksList />
                :
                <h1 style={{ textAlign: "center" }}>Завдань немає</h1>
            }
        </div>
    )
}

export default MainContent
