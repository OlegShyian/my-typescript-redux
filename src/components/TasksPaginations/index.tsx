import React, { useMemo, useState } from 'react'
import "./style.css"

interface IPaginationProps {
    outputTasks: any[];
    tasksLimit: number
    setTasksLimit: (arg: number) => void;
    currentPage: number;
    setCurrentPage: (arg: number) => void;
}

const TasksPagination: React.FC<IPaginationProps> = ({
    outputTasks,
    tasksLimit,
    setTasksLimit,
    currentPage,
    setCurrentPage }) => {

    const tasksOnPage = [3, 5, 10];
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(outputTasks.length / tasksLimit);
        return new Array(totalPages).fill("").map((el, ind) => ind + 1);
    }, [outputTasks, tasksLimit]);


    const handleSetLimit = (limit: number) => {
        if (currentPage > outputTasks.length / limit) {
            setCurrentPage(Math.ceil(outputTasks.length / limit));
        }
        setTasksLimit(limit);
    }


    return (
        <div className="wrapper__pagination">
            <div className="page__conteiner">
                {pageNumbers.map(currentPage =>
                    <span
                        key={currentPage}
                        className="page"
                        onClick={() => setCurrentPage(currentPage)}
                    >
                        {currentPage}
                    </span>
                )}
            </div>
            <div className="tasks__limit">
                {tasksOnPage.map((limit: number, ind) =>
                    <button
                        key={ind}
                        className="pagination__numbers"
                        onClick={() => handleSetLimit(limit)}
                    >{limit}</button>
                )}

            </div>
        </div>
    )
}

export default TasksPagination
