import { todoListApi } from "../../serverApi/todoListsApi"
import { Dispatch } from "redux"
import {addTodoAction, deleteTodoAction, setTodolistsAC} from "./todo-type";

export const postTodoThunk = (title: string) => (dispatch: Dispatch) => {
    todoListApi.postTodoLists(title)
        .then(res => {
            dispatch(addTodoAction(res.data.data.item.title, res.data.data.item.id))
        })
}

export const deleteTodoThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todoListApi.deleteTodo(todolistId)
        .then(res => {
            if (res.status === 200)
                dispatch(deleteTodoAction(todolistId))
        })

}

export const fetchTodoListThunk = (dispatch: Dispatch) => {
    todoListApi.getTodoLists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}