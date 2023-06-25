import {AddTodoActionType, RemoveTodoActionType, SetTodolistsActionType} from "../todo-reducer/todo-type";
import {SetStatusType} from "../app-reducer/app-reducer";
import {RequestStatusType} from "../app-reducer/app-reducer";

type SingleTaskType = {
    id: string,
    title: string,
    isDone: boolean,
    // entityStatus: RequestStatusType
}
export type ArrayTaskType = Array<SingleTaskType>

export type TaskStateType = {
    [key: string]: ArrayTaskType
}


type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todoId: string
    taskId: string
}

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    id: string
    todoId: string
}

type ChangeTaskChecked = {
    type: 'CHANGE-TASK-CHECKED'
    id: string
    todoId: string
}

type ChangeTitleTaskType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    id: string
    todoId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: ArrayTaskType
    todolistId: string
}

export type ActionTaskType = AddTaskType
    | RemoveTaskType
    | ChangeTaskChecked
    | AddTodoActionType
    | RemoveTodoActionType
    | ChangeTitleTaskType
    | SetTodolistsActionType
    | SetTasksActionType
    | SetStatusType

// actions task creator

export const addTaskAction = (title: string, todoId: string, taskId: string): AddTaskType => {
    return {type: 'ADD-TASK', title, todoId, taskId}
}

export const removeTaskAction = (id: string, todoId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', id, todoId}
}

export const changeTaskChecked = (id: string, todoId: string): ChangeTaskChecked => {
    return {type: 'CHANGE-TASK-CHECKED', id, todoId}
}

export const changeTitleTaskAction = (title: string, id: string, todoId: string): ChangeTitleTaskType => {
    return {type: 'CHANGE-TASK-TITLE', title, id, todoId}
}
export const setTaskAC = (tasks: ArrayTaskType, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}