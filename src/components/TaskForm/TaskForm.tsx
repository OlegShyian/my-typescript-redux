import React, { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';
import { IStore, ITask } from '../../types/types';
import './style.css';

const TaskForm: React.FC = () => {
    const { user, currentTask, btnName } = useSelector((store: IStore) => store);
    const { saveUserTasks, saveModalState, saveCurrentTask } = bindActionCreators(actionCreators, useDispatch());
    const [taskName, setTaskName] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const tasks = user.tasks;

    useEffect(() => {
        if (btnName === 'Save') {
            setTaskName(currentTask.name);
            setTaskStatus(currentTask.status);
        }
    }, [btnName, currentTask]);

    const editTasks = (taskName: string, taskStatus: string) => {
        return tasks.map((task: ITask) =>
            task.id === currentTask.id
                ? {
                      name: taskName,
                      status: taskStatus,
                      id: task.id,
                      checked: task.checked,
                  }
                : task
        );
    };

    const handleSetTask = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (taskName && taskStatus) {
            if (btnName === 'Save') {
                const result = editTasks(taskName, taskStatus);
                saveUserTasks({ ...user, tasks: result });
                saveCurrentTask({});
            } else {
                saveUserTasks({
                    ...user,
                    tasks: [
                        {
                            name: taskName,
                            status: taskStatus,
                            id: Date.now(),
                            checked: false,
                        },
                        ...tasks,
                    ],
                });
            }
            resetValues();
        } else {
            const emptyField = !taskName ? 'Name' : 'Task';
            alert(`Field ${emptyField} is empty`);
        }
    };

    const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetValues();
    };

    const resetValues = () => {
        setTaskName('');
        setTaskStatus('');
        saveModalState(false);
    };

    return (
        <form className={'form'}>
            <h2>Add new Task</h2>
            <div className={'form__content'}>
                <div className={'form__input'}>
                    <strong>Enter task name</strong>
                    <input value={taskName} type="text" placeholder="Name" onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <div className={'form__input'}>
                    <strong>Choose status</strong>
                    <select required value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                        <option value=""></option>
                        <option value="Todo">Todo</option>
                        <option value="In progress">In progress</option>
                        <option value="Comleted">Comleted</option>
                    </select>
                </div>
            </div>
            <div className={'form__button'}>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSetTask}>{btnName}</button>
            </div>
        </form>
    );
};

export default TaskForm;
