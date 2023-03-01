import {TaskStateType, ActionTaskType, setTaskAC} from "../task-reducer/task-type";
import {todolistID1, todolistID2} from "../../components/App/AppWithRedux";
import {todoListApi} from "../../serverApi/todoListsApi";
import {AppDispatch} from "../store/store";
import {Dispatch} from "redux";
import {addTaskAction} from "../task-reducer/task-type";

const { v4: uuidv4 } = require('uuid');

// const initialState: TaskStateType = {
//     [todolistID1]: [
//         {id: uuidv4(), title: 'HTML&CSS', isDone: true},
//         {id: uuidv4(), title: 'JS', isDone: true},
//         {id: uuidv4(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: uuidv4(), title: 'Rest API', isDone: true},
//         {id: uuidv4(), title: 'GraphQL', isDone: false},
//     ]
// }
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

const initialState: TaskStateType = {}

export const taskReducer = (state:TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            // const newState = {...state}
            // const newTask = {id: uuidv4(), title: action.title, isDone: false}
            const newTask = {id: action.taskId, title: action.title, isDone: false}
            // let tasksArr = newState[action.todoId]
            // newState[action.todoId] = [newTask, ...tasksArr]
            // return newState
            return {...state, [action.todoId]: [newTask, ...state[action.todoId]]}
        }
        case "REMOVE-TASK": {
            // const newState = {...state}
            // let tasksArr = newState[action.todoId]
            // newState[action.todoId] = tasksArr.filter(item => item.id !== action.id)
            // return newState
            return {...state, [action.todoId]: state[action.todoId].filter(item => item.id !== action.id)}
        }
        case "CHANGE-TASK-CHECKED": {
            // const newState = {...state}
            // let tasksArr = newState[action.todoId]
            //
            // const task = tasksArr.find(item => item.id === action.id)
            //
            // if (task) {
            //     task.isDone = !task.isDone
            // }
            //
            // return newState
            return {...state, [action.todoId]: state[action.todoId].map(item => {
                    if (item.id === action.id) {
                        return {...item, isDone: !item.isDone}
                    }
                    return item
                })}
        }
        case "CHANGE-TASK-TITLE": {
            // const newState = {...state}
            // let tasksArr = newState[action.todoId]
            //
            // const task = tasksArr.find(item => item.id === action.id)
            //
            // if (task) {
            //     task.title = action.title
            // }
            //
            // return newState
            return {...state, [action.todoId]: state[action.todoId].map(item => {
                    if (item.id === action.id) {
                        return {...item, title: action.title}
                    }
                    return item
                })}

        }
        case "ADD-TODO": {
            // const newState = {...state}
            // newState[action.todoId] = []
            // return newState
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
                console.log('is done')
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