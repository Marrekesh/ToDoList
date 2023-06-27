import { todoListApi } from "../../serverApi/todoListsApi"
import {ActionTodoType, changeEntityStatusAction} from "./todo-type";
import { Dispatch } from "redux"
import {addTodoAction, deleteTodoAction, setTodolistsAC} from "./todo-type";
import {setStatusAC} from "../app-reducer/app-reducer";
import {setErrorAC} from "../app-reducer/app-reducer";

export const postTodoThunk = (title: string) => (dispatch: Dispatch<ActionTodoType>) => {
    dispatch(setStatusAC('loading'))
    todoListApi.postTodoLists(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                console.log(res)
                dispatch(addTodoAction(res.data.data.item))
            } else if (res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages[0]))
            }

        })
        .finally(() => dispatch(setStatusAC('successed')))
}

export const deleteTodoThunk = (todolistId: string) => (dispatch: Dispatch<ActionTodoType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityStatusAction(todolistId, "loading"))
    todoListApi.deleteTodo(todolistId)
        .then(res => {
            if (res.status === 200)
                dispatch(deleteTodoAction(todolistId))
                dispatch(setStatusAC('successed'))
                dispatch(changeEntityStatusAction(todolistId, "idle"))
        })
        .catch(error => {
            dispatch(setStatusAC('successed'))
            dispatch(changeEntityStatusAction(todolistId, "idle"))
            dispatch(setErrorAC(error.message))
        })

}

export const fetchTodoListThunk = (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todoListApi.getTodoLists()
        .then(res => {
            console.log(res)
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC('successed'))
        })
}