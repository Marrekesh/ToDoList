import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/addItemForm/AddItemForn";
import TodoList from "../../components/TodoList/TodoList";
import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {deleteTodoThunk, fetchTodoListThunk, postTodoThunk} from "../../state/todo-reducer/thunks-todo";
import {changeFilterTodoAction} from "../../state/todo-reducer/todo-type";
import {Navigate} from "react-router-dom";
import {TaskStatus} from "../../serverApi/todoListsApi";
import {updateTaskTC} from "../../state/task-reducer/thunks-task-reducer";

const { v4: uuidv4 } = require('uuid');

export type ArrayTaskType = Array<SingleTaskType>
export type ArrayBtnInfoType = Array<BtnInfoType>
export type filterType = 'all' | 'active' | 'completed'

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

export const TodoLists = () => {

    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todo)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [btnInfo, setBtnInfo] = useState<ArrayBtnInfoType>([
        {id: uuidv4(), title: 'all'},
        {id: uuidv4(), title: 'active'},
        {id: uuidv4(), title: 'completed'},
    ])

    //CRUD FUNCTION
    useEffect(() => {
        console.log('todolists')
        if (!isLoggedIn) return
        dispatch(fetchTodoListThunk)
    }, [])

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

    const changeStatus = useCallback(function (id: string, status: TaskStatus, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    return <>

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
                                        changeStatus={changeStatus}
                                        entityStatus={todo.entityStatus}
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

    </>
}