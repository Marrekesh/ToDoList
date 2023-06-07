import { Dispatch } from "redux"
import { todoListApi } from "../../serverApi/todoListsApi"
import { setTaskAC, removeTaskAction, addTaskAction, changeTitleTaskAction} from "../task-reducer/task-type";


export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todoListApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todolistId))
        })
}

export const postTaskThunk = (title: string, todoId: string) => (dispatch: Dispatch) => {
    todoListApi.postTask(title, todoId)
        .then(res => {
            if (res) {
                dispatch(addTaskAction(res.data.data.item.title, todoId ,res.data.data.item.id))
            }

        })
}

export const deleteTaskThunk = (taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    todoListApi.deleteTask(taskId, todoListId)
        .then(res => {
            if (res.status === 200) {
                dispatch(removeTaskAction(taskId, todoListId))
            }
        })
}

export const changeTaskTitle = (title: string, taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    return todoListApi.changeTaskTitle(title, taskId, todoListId)
        .then(res => {
            dispatch(changeTitleTaskAction(res.data.data.item.title, taskId, todoListId))
        })
}