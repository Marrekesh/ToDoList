import { todoListApi } from "../../serverApi/todoListsApi"
import {ActionTodoType, changeEntityStatusAction} from "./todo-type";
import { Dispatch } from "redux"
import {addTodoAction, deleteTodoAction, setTodolistsAC} from "./todo-type";
import {appActions} from "../app-reducer/app-reducer";


export const postTodoThunk = (title: string) => (dispatch: Dispatch<ActionTodoType>) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todoListApi.postTodoLists(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                console.log(res)
                dispatch(addTodoAction(res.data.data.item))
            } else if (res.data.messages.length) {
                dispatch(appActions.setError({error: res.data.messages[0]}))
            }

        })
        .finally(() => dispatch(appActions.setStatus({status: 'successed'})))
}

export const deleteTodoThunk = (todolistId: string) => (dispatch: Dispatch<ActionTodoType>) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    dispatch(changeEntityStatusAction(todolistId, "loading"))
    todoListApi.deleteTodo(todolistId)
        .then(res => {
            if (res.status === 200)
                dispatch(deleteTodoAction(todolistId))
                dispatch(appActions.setStatus({status: 'successed'}))
                dispatch(changeEntityStatusAction(todolistId, "idle"))
        })
        .catch(error => {
            dispatch(appActions.setStatus({status: 'successed'}))
            dispatch(changeEntityStatusAction(todolistId, "idle"))
            dispatch(appActions.setError({error: error.message}))
        })

}

export const fetchTodoListThunk = (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todoListApi.getTodoLists()
        .then(res => {
            console.log(res)
            dispatch(setTodolistsAC(res.data))
            dispatch(appActions.setStatus({status: 'successed'}))
        })
}