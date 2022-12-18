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


function MenuIcon() {
    return null;
}

function AppWithReducers() {

    //DATA

    // let todolistID1: string = uuidv4()
    // let todolistID2: string = uuidv4()
    //
    // let [todolists, setTodolists] = useState<Array<todos>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    //
    // let [tasks, setTasks] = useState<TaskStateType>({
    //     [todolistID1]: [
    //         {id: uuidv4(), title: 'HTML&CSS', isDone: true},
    //         {id: uuidv4(), title: 'JS', isDone: true},
    //         {id: uuidv4(), title: 'ReactJS', isDone: false},
    //
    //     ],
    //     [todolistID2]: [
    //         {id: uuidv4(), title: 'Rest API', isDone: true},
    //         {id: uuidv4(), title: 'GraphQL', isDone: false},
    //     ]
    // })

    let todolistID1: string = uuidv4()
    let todolistID2: string = uuidv4()

    let [todolists, dispatchTodolists] = useReducer(todoReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(taskReducer,{
        [todolistID1]: [
            {id: uuidv4(), title: 'HTML&CSS', isDone: true},
            {id: uuidv4(), title: 'JS', isDone: true},
            {id: uuidv4(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: uuidv4(), title: 'Rest API', isDone: true},
            {id: uuidv4(), title: 'GraphQL', isDone: false},
        ]
    })



    const [btnInfo, setBtnInfo] = useState<ArrayBtnInfoType>([
        {id: uuidv4(), title: 'all'},
        {id: uuidv4(), title: 'active'},
        {id: uuidv4(), title: 'completed'},
    ])

    //CRUD FUNCTION
    const addTask = (title: string, todolistId: string) => {

        const action = addTaskAction(title, todolistId)
        dispatchTasks(action)
    }

    const addTodoList = (title: string) => {

        const action = addTodoAction(title)
        dispatchTodolists(action)
        dispatchTasks(action)

    }

    const removeTask = (id: string, todolistId: string) => {

        const action = removeTaskAction(id, todolistId)
        dispatchTasks(action)

    }

    const changeFilter = (item: filterType, todolistId: string) => {
        const action = changeFilterTodoAction(todolistId, item)
        dispatchTodolists(action)
    }


    const checkedTask = (id: string, todolistId: string) => {
        const action = changeTaskChecked(id, todolistId)
        dispatchTasks(action)
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        const action = changeTitleTaskAction(title, id, todolistId)
        dispatchTasks(action)
    }

    const deleteTodos = (id: string) => {
        const action = deleteTodoAction(id)
        dispatchTasks(action)
        dispatchTodolists(action)

    }
    console.log('app pereresovano')
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
                        todolists.map(todo => {
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

export default AppWithReducers;