import {TaskStateType, ActionTaskType, setTaskAC, removeTaskAction} from "../task-reducer/task-type";

import {todoListApi} from "../../serverApi/todoListsApi";
import {Dispatch} from "redux";
import {addTaskAction, changeTitleTaskAction} from "../task-reducer/task-type";

const { v4: uuidv4 } = require('uuid');

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

const initialState: TaskStateType = {}

export const taskReducer = (state:TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {

            const newTask = {id: action.taskId, title: action.title, isDone: false}
            return {...state, [action.todoId]: [newTask, ...state[action.todoId]]}
        }
        case "REMOVE-TASK": {

            return {...state, [action.todoId]: state[action.todoId].filter(item => item.id !== action.id)}
        }
        case "CHANGE-TASK-CHECKED": {

            return {...state, [action.todoId]: state[action.todoId].map(item => {
                    if (item.id === action.id) {
                        return {...item, isDone: !item.isDone}
                    }
                    return item
                })}
        }
        case "CHANGE-TASK-TITLE": {

            return {...state, [action.todoId]: state[action.todoId].map(item => {
                    if (item.id === action.id) {
                        return {...item, title: action.title}
                    }
                    return item
                })}

        }
        case "ADD-TODO": {

            return {...state, [action.todoId]: []}
        }
        case "DELETE-TODO": {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}