import { Dispatch } from "redux"
import {TaskPriorities, TaskStatus, todoListApi, UpdateTaskModel} from "../../serverApi/todoListsApi"
import {
    setTaskAC,
    removeTaskAction,
    addTaskAction,
    changeTitleTaskAction,
    UpdateDomainTaskModelType,
    updateTaskAC
} from "../task-reducer/task-type";
import {appActions} from "../app-reducer/app-reducer";
import {AppRootStateType} from "../store/store";
import {handleServerAppError, hendleServerNetworkError} from "../../utils/error-utils";

export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todoListApi.getTasks(todolistId)
        .then((res) => {
            console.log(res)
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todolistId))
            dispatch(appActions.setStatus({status: 'successed'}))
        })
}

export const postTaskThunk = (title: string, todoId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todoListApi.postTask(title, todoId)
        .then(res => {
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(addTaskAction(res.data.data.item))
            } else if (res.data.messages.length) {
                dispatch(appActions.setError({error: res.data.messages[0]}))
            }
        })
        .finally(() => dispatch(appActions.setStatus({status: 'successed'})))

}

export const deleteTaskThunk = (taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todoListApi.deleteTask(taskId, todoListId)
        .then(res => {
            if (res.status === 200) {
                dispatch(removeTaskAction(taskId, todoListId))
                dispatch(appActions.setStatus({status: 'successed'}))
            }
        })
}

export const changeTaskTitle = (title: string, taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    return todoListApi.changeTaskTitle(title, taskId, todoListId)
        .then(res => {
            dispatch(changeTitleTaskAction(res.data.data.item.title, taskId, todoListId))
            dispatch(appActions.setStatus({status: 'successed'}))
        })
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()

        const task = state.task[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModel = {
            deadline: task.deadline,
            description:task.description,
            completed: task.completed,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todoListApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                console.log(res)
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(todolistId, taskId,  domainModel)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                hendleServerNetworkError(error, dispatch);
            })
    }

