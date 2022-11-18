import React, {ChangeEvent} from 'react';
import {ArrayBtnInfoType, ArrayTaskType} from "../App/App";
import {useState} from "react";
import {filterType} from "../App/App";
import Button from "../button/Button";
import AddItemForm from "../addItemForm/AddItemForn";
import EditSpan from "../editSpan/EditSpan";

import c from "./todoList.module.css";
const { v4: uuidv4 } = require('uuid');


type ToDoPropsType = {
    todoId: string
    title: string
    tasks: ArrayTaskType
    filter: filterType
    changeFilter: (item: filterType, todolistId: string) => void
    btnInfo: ArrayBtnInfoType
    addTask: (title: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
    checkedTask: (id: string, todolistId: string) => void
    deleteTodos: (id: string) => void
    changeTaskTitle:(id: string, title: string, todoId: string) => void

}

const TodoList = (
    {
        tasks,
        todoId,
        title,
        addTask,
        removeTasks,
        filter,
        btnInfo,
        changeFilter,
        checkedTask,
        deleteTodos,
        changeTaskTitle
    }: ToDoPropsType
) => {

    const addTaskHandler = (title: string) => {
        addTask(title, todoId)
    }
    //list items
    const tasksList = tasks.map((item) => {
        const checkedTaskHandler = () => checkedTask(item.id, todoId)
        const removeTaskHandler = () => removeTasks(item.id, todoId)

        const changStatusEditSpan = (title: string) => {
            changeTaskTitle(item.id ,title, todoId)
        }

        return <li key={item.id}>
            <input
                type="checkbox"
                checked={item.isDone}
                onChange={checkedTaskHandler}
            />
            <EditSpan callback={changStatusEditSpan} title={item.title}/>
            <button onClick={removeTaskHandler}>x</button>
        </li>
    })

    const viewTaskList = tasksList.length ? tasksList : <div>Нет тасок</div>


    const btnInfoList = btnInfo.map(item => {
        const changeFilterHandler = () => changeFilter(item.title, todoId)
        const btnClasses = filter === item.title ? c.btnActive : ''
        return <button className={btnClasses} onClick={changeFilterHandler} key={item.id}>{item.title}</button>
    })

    //delete task
    const deleteTaskHandler = () => deleteTodos(todoId)

    return (
        <div>
            <h3>{title}
                <button onClick={deleteTaskHandler}>X</button>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>
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