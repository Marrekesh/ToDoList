import React, {ChangeEvent} from 'react';
import {ArrayBtnInfoType, ArrayTaskType} from "../App/App";
import {useState} from "react";
import {filterType} from "../App/App";
import Button from "../button/Button";
const { v4: uuidv4 } = require('uuid');

type ToDoPropsType = {
    title: string
    tasks: ArrayTaskType
    filter: filterType
    changeFilter: (item: filterType) => void
    btnInfo: ArrayBtnInfoType
    addTask: (title: string) => void
    removeTasks: (id: string) => void

}

const TodoList = ({tasks, title, addTask, removeTasks, filter, btnInfo, changeFilter}: ToDoPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const taskTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={taskTextHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    tasks.map(item => {
                        
                        return <li key={item.id}>
                            <input
                                type="checkbox"
                                checked={item.isDone}
                            />
                            <span>{item.title}</span>
                            <button onClick={() => removeTasks(item.id)}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                {
                    btnInfo.map(item => {
                        return <button onClick={() => changeFilter(item.title)} key={item.id}>{item.title}</button>
                    })
                }

            </div>
        </div>
    );
};

export default TodoList;