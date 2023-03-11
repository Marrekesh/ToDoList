import React, { useCallback, useEffect} from 'react';
import {ArrayBtnInfoType} from "../App/AppWithRedux";
import {filterType} from "../App/AppWithRedux";
import {Button} from "@mui/material";
import Tasks from "../tasks/Tasks";
import AddItemForm from "../addItemForm/AddItemForn";
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import c from "./todoList.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {postTaskThunk, fetchTasksThunk} from "../../state/task-reducer/tasks-reducer";


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
        dispatch(postTaskThunk(title, todoId))
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

    useEffect(()=> {
        dispatch(fetchTasksThunk(todoId))
    }, [])

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