import React, {useCallback, useEffect} from 'react';
import './App.css';
import {useState} from "react";
import TodoList from "../TodoList/TodoList";

import {deleteTodoThunk, fetchTodoListThunk, todoReducer} from "../../state/todo-reducer/todo-reducer";
import AddItemForm from "../addItemForm/AddItemForn";
import {postTodoThunk} from "../../state/todo-reducer/todo-reducer";

import {changeFilterTodoAction} from "../../state/todo-reducer/todo-type";
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

    const [btnInfo, setBtnInfo] = useState<ArrayBtnInfoType>([
        {id: uuidv4(), title: 'all'},
        {id: uuidv4(), title: 'active'},
        {id: uuidv4(), title: 'completed'},
    ])

    //CRUD FUNCTION


    const addTodoList = useCallback((title: string) => {
        dispatch(postTodoThunk(title))
    }, [dispatch])

    const changeFilter = useCallback((item: filterType, todolistId: string) => {
        const action = changeFilterTodoAction(todolistId, item)
        dispatch(action)
    }, [dispatch])

    const deleteTodos = useCallback((todolistId: string) => {
        dispatch(deleteTodoThunk(todolistId))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodoListThunk)


    }, [])
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
                        todos.length === 0 ? <div>Нет туду листов</div> :
                        todos.map(todo => {

                            return (
                                <Grid item key={todo.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={todo.id}
                                            todoId={todo.id}
                                            title={todo.title}
                                            btnInfo={btnInfo}
                                            filter={todo.filter}
                                            changeFilter={changeFilter}
                                            deleteTodos={deleteTodos}
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