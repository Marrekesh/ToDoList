import { Dispatch } from "redux"
import { todoListApi } from "../../serverApi/todoListsApi"
import { setTaskAC, removeTaskAction, addTaskAction, changeTitleTaskAction} from "../task-reducer/task-type";
import {setErrorAC, setStatusAC} from "../app-reducer/app-reducer";

export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todoListApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todolistId))
            dispatch(setStatusAC('successed'))
        })
}

export const postTaskThunk = (title: string, todoId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todoListApi.postTask(title, todoId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAction(res.data.data.item.title, todoId ,res.data.data.item.id))
            } else {
                if (res.data.resultCode.length()) {
                    dispatch(setErrorAC(res.data.messages[0]))
                }

            }

        })
        .finally(() => dispatch(setStatusAC('successed')))

}

export const deleteTaskThunk = (taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todoListApi.deleteTask(taskId, todoListId)
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                dispatch(removeTaskAction(taskId, todoListId))
                dispatch(setStatusAC('successed'))
            }
        })
}

export const changeTaskTitle = (title: string, taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    return todoListApi.changeTaskTitle(title, taskId, todoListId)
        .then(res => {
            dispatch(changeTitleTaskAction(res.data.data.item.title, taskId, todoListId))
            dispatch(setStatusAC('successed'))
        })
}

