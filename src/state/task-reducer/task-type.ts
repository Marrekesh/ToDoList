import {AddTodoActionType, RemoveTodoActionType, SetTodolistsActionType, ClearDataType} from "../todo-reducer/todo-type";
import {SetStatusType} from "../app-reducer/app-reducer";
import {RequestStatusType} from "../app-reducer/app-reducer";
import {TaskPriorities, TaskStatus, TaskType, UpdateTaskModel} from "../../serverApi/todoListsApi";


// type SingleTaskType = {
//     id: string,
//     title: string,
//     isDone: boolean,
//     // entityStatus: RequestStatusType
// }
// export type ArrayTaskType = Array<SingleTaskType>

export type TaskStateType = {
    [key: string]: TaskType[]
}


type AddTaskType = {
    type: 'ADD-TASK'
    task: TaskType
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
    tasks: TaskType[]
    todolistId: string
}

export type UpdateTaskType = {
    type: 'UPDATE-TASKS',
    todoId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
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
    | ClearDataType
    | UpdateTaskType

// actions task creator

export const addTaskAction = (task: TaskType): AddTaskType => {
    return {type: 'ADD-TASK', task}
}

export const removeTaskAction = (id: string, todoId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', id, todoId}
}

// export const changeTaskChecked = (id: string, todoId: string): ChangeTaskChecked => {
//     return {type: 'CHANGE-TASK-CHECKED', id, todoId}
// }

export const changeTitleTaskAction = (title: string, id: string, todoId: string): ChangeTitleTaskType => {
    return {type: 'CHANGE-TASK-TITLE', title, id, todoId}
}
export const setTaskAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const updateTaskAC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType): UpdateTaskType => {
    return {type: "UPDATE-TASKS", todoId, taskId, domainModel}
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatus
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}