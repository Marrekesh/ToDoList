import   {setTodolistsAC, TodoType, ActionTodoType} from "./todo-type";
import {todoListApi} from "../../serverApi/todoListsApi";
import {addTodoAction, deleteTodoAction} from "./todo-type";
import {Dispatch} from "redux";

import { postTodoThunk, fetchTodoListThunk, deleteTodoThunk } from "./thunks-todo-reducer";

// const initialState: Array<TodoType> = [
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ]

// export const postTodoThunk = (title: string) => (dispatch: Dispatch) => {
//     todoListApi.postTodoLists(title)
//         .then(res => {
//             dispatch(addTodoAction(res.data.data.item.title, res.data.data.item.id))
//         })
// }
// export const deleteTodoThunk = (todolistId: string) => (dispatch: Dispatch) => {
//     todoListApi.deleteTodo(todolistId)
//         .then(res => {
//             if (res.status === 200)
//                 dispatch(deleteTodoAction(todolistId))
//         })

// }

// export const fetchTodoListThunk = (dispatch: Dispatch) => {
//     todoListApi.getTodoLists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//         })
// }

const initialState: Array<TodoType> = []

export const todoReducer = (state: Array<TodoType> = initialState, action: ActionTodoType): Array<TodoType> => {
    switch (action.type) {
        case 'DELETE-TODO':
            return state.filter(item => item.id !== action.id)
        case 'ADD-TODO': {
            return [...state, {
                id: action.todoId,
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-FILTER-TODO': {
            // const todolist = state.find(item => item.id === action.id)
            // if (todolist) {
            //     todolist.filter = action.filter
            // }
            
            // return [...state]
            return state.map(item => item.id === action.id ? {...item, filter: action.filter} : item)
        }
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state
    }
}

