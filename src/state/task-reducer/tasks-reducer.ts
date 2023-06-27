import {TaskStateType, ActionTaskType} from "../task-reducer/task-type";



const initialState: TaskStateType = {}

export const taskReducer = (state:TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {

            const newTask = {
                id: action.taskId,
                title: action.title,
                isDone: false,
            }
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

            return {...state, [action.todoList.id]: []}
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
        case "CLEAR-DATA":
            return {}
        default:
            return state
    }
}