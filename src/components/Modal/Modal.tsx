import React from 'react'
import TaskForm from '../TaskForm/TaskForm'
import "./style.css"



const Modal: React.FC = () => {
    return (
        <div className="myModal">
            <TaskForm/>
        </div>
    )
}

export default Modal
