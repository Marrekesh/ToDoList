import {TodoType} from "./types";
import {ActionType} from "./types";
import {todolistID1, todolistID2} from "../components/App/AppWithRedux";

const { v4: uuidv4 } = require('uuid');


const initialState: Array<TodoType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todoReducer = (state: Array<TodoType> = initialState, action: ActionType): Array<TodoType> => {
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
            //
            // return [...state]
            return state.map(item => {
                if (item.id === action.id) {
                    return {...item, filter: action.filter}
                }
                return item
            })
        }
        default:
            return state
    }
}

