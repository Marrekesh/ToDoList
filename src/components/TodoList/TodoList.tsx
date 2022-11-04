import React, {ChangeEvent} from 'react';
import {ArrayBtnInfoType, ArrayTaskType} from "../App/App";
import {useState} from "react";
import {filterType} from "../App/App";
import Button from "../button/Button";
import c from "./todoList.module.css";
const { v4: uuidv4 } = require('uuid');

type ToDoPropsType = {
    title: string
    error: string | null
    setError: (item: string | null) => void
    tasks: ArrayTaskType
    filter: filterType
    changeFilter: (item: filterType) => void
    btnInfo: ArrayBtnInfoType
    addTask: (title: string) => void
    removeTasks: (id: string) => void
    checkedTask: (id: string) => void

}

const TodoList = (
    {
        tasks,
        title,
        addTask,
        removeTasks,
        filter,
        btnInfo,
        changeFilter,
        checkedTask,
        error,
        setError
    }: ToDoPropsType
) => {

    const [taskTitle, setTaskTitle] = useState('')

    //handler functions
    const taskTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.target.value)
    }

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    //list items
    const tasksList = tasks.map((item) => {
        const checkedTaskHandler = () => checkedTask(item.id)
        const removeTaskHandler = () => removeTasks(item.id)

        return <li key={item.id}>
            <input
                type="checkbox"
                checked={item.isDone}
                onChange={checkedTaskHandler}
            />
            <span>{item.title}</span>
            <button onClick={removeTaskHandler}>x</button>
        </li>
    })

    const viewTaskList = tasksList.length ? tasksList : <div>Нет тасок</div>


    const btnInfoList = btnInfo.map(item => {
        const changeFilterHandler = () => changeFilter(item.title)
        const btnClasses = filter === item.title ? c.btnActive : ''
        return <button className={btnClasses} onClick={changeFilterHandler} key={item.id}>{item.title}</button>
    })

    //classes
    const errorInputClass = error ? c.errorInput : ''

    //error text block

    const errorBlock = error ? <div className={c.errorText}>{error}</div> : null

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={errorInputClass} value={taskTitle} onChange={taskTextHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {errorBlock}
            <ul>
                {viewTaskList}
            </ul>
            <div>
                {btnInfoList}
            </div>
        </div>
    );
};

export default TodoList;