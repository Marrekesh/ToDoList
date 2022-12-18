import React from 'react';
import './App.css';
import {useState, useReducer} from "react";
import TodoList from "../TodoList/TodoList";
import {taskReducer} from "../../state/tasks-reducer";
import {todoReducer} from "../../state/todo-reducer";
import AddItemForm from "../addItemForm/AddItemForn";
import {
    addTodoAction,
    addTaskAction,
    removeTaskAction,
    changeTaskChecked,
    changeFilterTodoAction,
    deleteTodoAction,
    changeTitleTaskAction
} from "../../state/types";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";


const { v4: uuidv4 } = require('uuid');

type SingleTaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type BtnInfoType = {
    id: string,
    title: filterType
}

type todos = {
    id: string
    title: string
    filter: filterType
}

export type TaskStateType = {
    [key: string]: ArrayTaskType
}

export type ArrayTaskType = Array<SingleTaskType>
export type ArrayBtnInfoType = Array<BtnInfoType>
export type filterType = 'all' | 'active' | 'completed'

export let todolistID1: string = uuidv4()
export let todolistID2: string = uuidv4()

function AppWithRedux() {

    //DATA

    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todo)
    const tasks = useAppSelector(state => state.task)

    const [btnInfo, setBtnInfo] = useState<ArrayBtnInfoType>([
        {id: uuidv4(), title: 'all'},
        {id: uuidv4(), title: 'active'},
        {id: uuidv4(), title: 'completed'},
    ])

    //CRUD FUNCTION
    const addTask = (title: string, todolistId: string) => {

        const action = addTaskAction(title, todolistId)
        dispatch(action)
    }

    const addTodoList = (title: string) => {

        const action = addTodoAction(title)
        dispatch(action)


    }

    const removeTask = (id: string, todolistId: string) => {

        const action = removeTaskAction(id, todolistId)
        dispatch(action)

    }

    const changeFilter = (item: filterType, todolistId: string) => {
        const action = changeFilterTodoAction(todolistId, item)
        dispatch(action)
    }


    const checkedTask = (id: string, todolistId: string) => {
        const action = changeTaskChecked(id, todolistId)
        dispatch(action)
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        const action = changeTitleTaskAction(title, id, todolistId)
        dispatch(action)
    }

    const deleteTodos = (id: string) => {
        const action = deleteTodoAction(id)
        dispatch(action)

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todos.map(todo => {
                            let allTodolistTasks = tasks[todo.id]
                            let tasksForToDoList = allTodolistTasks

                            if (todo.filter === 'active') {
                                tasksForToDoList = allTodolistTasks.filter(tasks => !tasks.isDone)
                            }

                            if (todo.filter === 'completed') {
                                tasksForToDoList = allTodolistTasks.filter(tasks => tasks.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={todo.id}
                                            todoId={todo.id}
                                            title={todo.title}
                                            tasks={tasksForToDoList}
                                            checkedTask={checkedTask}
                                            btnInfo={btnInfo}
                                            filter={todo.filter}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            removeTasks={removeTask}
                                            deleteTodos={deleteTodos}
                                            changeTaskTitle={changeTaskTitle}
                                        />
                                    </Paper>

                                </Grid>

                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;