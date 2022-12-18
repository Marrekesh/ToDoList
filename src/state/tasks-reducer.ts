import {TaskStateType} from "./types";
import {ActionTaskType} from "./types";
import {todolistID1, todolistID2} from "../components/App/AppWithRedux";
const { v4: uuidv4 } = require('uuid');


const initialState: TaskStateType = {
    [todolistID1]: [
        {id: uuidv4(), title: 'HTML&CSS', isDone: true},
        {id: uuidv4(), title: 'JS', isDone: true},
        {id: uuidv4(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: uuidv4(), title: 'Rest API', isDone: true},
        {id: uuidv4(), title: 'GraphQL', isDone: false},
    ]
}

export const taskReducer = (state:TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newState = {...state}
            const newTask = {id: uuidv4(), title: action.title, isDone: false}
            let tasksArr = newState[action.todoId]
            newState[action.todoId] = [newTask, ...tasksArr]
            return newState
        }
        case "REMOVE-TASK": {
            const newState = {...state}
            let tasksArr = newState[action.todoId]
            newState[action.todoId] = tasksArr.filter(item => item.id !== action.id)
            return newState
        }
        case "CHANGE-TASK-CHECKED": {
            const newState = {...state}
            let tasksArr = newState[action.todoId]

            const task = tasksArr.find(item => item.id === action.id)

            if (task) {
                task.isDone = !task.isDone
            }

            return newState
        }
        case "CHANGE-TASK-TITLE": {
            const newState = {...state}
            let tasksArr = newState[action.todoId]

            const task = tasksArr.find(item => item.id === action.id)

            if (task) {
                task.title = action.title
            }

            return newState

        }
        case "ADD-TODO": {
            const newState = {...state}
            newState[action.todoId] = []
            return newState
        }
        case "DELETE-TODO": {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state
    }
}