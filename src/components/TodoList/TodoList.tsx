import React, {ChangeEvent} from 'react';
import {ArrayBtnInfoType, ArrayTaskType} from "../App/App";
import {useState} from "react";
import {filterType} from "../App/App";
import {Button, Checkbox} from "@mui/material";
import Btn from "../button/Button";

import AddItemForm from "../addItemForm/AddItemForn";
import EditSpan from "../editSpan/EditSpan";
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
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

        return <div key={item.id}>
            <Checkbox
                color='primary'
                checked={item.isDone}
                onChange={checkedTaskHandler}
            />
            <EditSpan callback={changStatusEditSpan} title={item.title}/>
            <IconButton  onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    })

    const viewTaskList = tasksList.length ? tasksList : <div>Нет тасок</div>
    const AddItemFormMemo = React.memo(AddItemForm)

    const btnInfoList = btnInfo.map(item => {
        const changeFilterHandler = () => changeFilter(item.title, todoId)
        const btnClasses = filter === item.title ? c.btnActive : ''
        return <Button variant="contained"
                       className={btnClasses}
                       onClick={changeFilterHandler}
                       color={filter === item.title ? 'secondary' : 'primary'}
                       key={item.id}
                        >{item.title}
                </Button>
    })

    //delete task
    const deleteTaskHandler = () => deleteTodos(todoId)

    return (
        <div>
            <h3>{title}
                <IconButton onClick={deleteTaskHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemFormMemo addItem={addTaskHandler}/>
            <div>
                {viewTaskList}
            </div>
            <div>
                {btnInfoList}
            </div>
        </div>
    );
};

export default TodoList;