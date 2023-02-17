import React, {ChangeEvent, useCallback} from 'react';
import {ArrayBtnInfoType, ArrayTaskType} from "../App/AppWithRedux";
import {useState} from "react";
import {filterType} from "../App/AppWithRedux";
import {Button, Checkbox} from "@mui/material";
import Btn from "../button/Button";
import Tasks from "../tasks/Tasks";
import AddItemForm from "../addItemForm/AddItemForn";
import EditSpan from "../editSpan/EditSpan";
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import c from "./todoList.module.css";
import {addTaskAction, changeTaskChecked, changeTitleTaskAction, removeTaskAction} from "../../state/types";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
const { v4: uuidv4 } = require('uuid');


type ToDoPropsType = {
    todoId: string
    title: string
    filter: filterType
    changeFilter: (item: filterType, todolistId: string) => void
    btnInfo: ArrayBtnInfoType
    deleteTodos: (id: string) => void

}

const TodoList = React.memo((
    {
        todoId,
        title,
        filter,
        btnInfo,
        changeFilter,
        deleteTodos,

    }: ToDoPropsType
) => {
    const tasks = useAppSelector(state => state.task[todoId])
    const dispatch = useAppDispatch()


    const addTaskHandler = useCallback((title: string) => {
        const action = addTaskAction(title, todoId)
        dispatch(action)
    }, [dispatch, todoId])

    let allTodolistTasks = tasks
    let tasksForToDoList = allTodolistTasks

    if (filter === 'active') {
        tasksForToDoList = allTodolistTasks.filter(tasks => !tasks.isDone)
    }

    if (filter === 'completed') {
        tasksForToDoList = allTodolistTasks.filter(tasks => tasks.isDone)
    }


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

            <AddItemForm addItem={addTaskHandler}/>
            <div>
                {   tasksForToDoList.length ?

                    tasksForToDoList.map((task) => {
                       return <Tasks key={task.id} id={task.id} todoId={todoId} isDone={task.isDone} title={task.title}/>
                    })
                    : <div>Нет тасок</div>

                }
            </div>
            <div>
                {btnInfoList}
            </div>
        </div>
    );
});

export default TodoList;