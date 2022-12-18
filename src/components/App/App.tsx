import React from 'react';
import './App.css';
import {useState} from "react";
import TodoList from "../TodoList/TodoList";
import AddItemForm from "../addItemForm/AddItemForn";
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

function App() {

    //DATA


    let todolistID1: string = uuidv4()
    let todolistID2: string = uuidv4()

    let [todolists, setTodolists] = useState<Array<todos>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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

        const task = {
            id: uuidv4(),
            title,
            isDone: false
        }

        let todoListTasks = tasks[todolistId]

        tasks[todolistId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {

        const todoList: todos = {
            id: uuidv4(),
            title,
            filter: 'all'

        }

        setTodolists([todoList, ...todolists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })

    }

    const removeTask = (id: string, todolistId: string) => {
        let todoListTasks = tasks[todolistId]

        tasks[todolistId] = todoListTasks.filter(item => item.id !== id)
        setTasks({...tasks})
    }

    const changeFilter = (item: filterType, todolistId: string) => {
        let todolist = todolists.find(item => item.id === todolistId)

        if (todolist) {
            todolist.filter = item
            setTodolists([...todolists])
        }
    }


    const checkedTask = (id: string, todolistId: string) => {

        const todolistTask = tasks[todolistId]

        const task = todolistTask.find(item => item.id === id)

        if (task) {
           task.isDone = !task.isDone
        }

        setTasks({...tasks})
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {

        const todolistTask = tasks[todolistId]

        const task = todolistTask.find(item => item.id === id)

        if (task) {
            task.title = title
        }

        setTasks({...tasks})
    }

    const deleteTodos = (id: string) => {
        setTodolists(todolists.filter(item => item.id !== id))

        delete tasks[id]

        setTasks({...tasks})
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

export default App;
