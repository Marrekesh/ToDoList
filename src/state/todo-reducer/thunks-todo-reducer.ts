import { todoListApi } from "../../serverApi/todoListsApi"
import {ActionTodoType} from "./todo-type";
import { Dispatch } from "redux"
import {addTodoAction, deleteTodoAction, setTodolistsAC} from "./todo-type";
import {setStatusAC} from "../app-reducer/app-reducer";

export const postTodoThunk = (title: string) => (dispatch: Dispatch<ActionTodoType>) => {
    dispatch(setStatusAC('loading'))
    todoListApi.postTodoLists(title)
        .then(res => {
            dispatch(addTodoAction(res.data.data.item.title, res.data.data.item.id))
            dispatch(setStatusAC('successed'))
        })
}

export const deleteTodoThunk = (todolistId: string) => (dispatch: Dispatch<ActionTodoType>) => {
    dispatch(setStatusAC('loading'))
    todoListApi.deleteTodo(todolistId)
        .then(res => {
            if (res.status === 200)
                dispatch(deleteTodoAction(todolistId))
                dispatch(setStatusAC('successed'))
        })

}

export const fetchTodoListThunk = (dispatch: Dispatch<ActionTodoType>) => {
    dispatch(setStatusAC('loading'))
    todoListApi.getTodoLists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC('successed'))
        })
}