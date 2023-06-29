import {
    setTodolistsAC,
    ActionTodoType,
    SetTodolistsActionType,
    RemoveTodoActionType,
    AddTodoActionType,
    filterType,
    ChangeFilterActionType,
    ChangeEntityStatusActionType,
    ClearDataType
} from "./todo-type";

import {RequestStatusType} from "../app-reducer/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



// export type ArrayTaskType = Array<SingleTaskType>
// export type ArrayBtnInfoType = Array<BtnInfoType>



//TYPES

export type TodoListDomainType = TodoListType & {
    filter: filterType,
    entityStatus: RequestStatusType
}

export type TodoListType = {
    addedDate: string
    id: string
    order: number
    title: string
}

//SLICE

const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodoLists: (state, action: PayloadAction<{todoLists: TodoListType[]}>) => {
            return action.payload.todoLists.map((item) => ({...item, filter: 'all', entityStatus: 'idle'}))
        }
    }

})




export const todoReducer = (state: Array<TodoListDomainType> = initialState, action: ActionTodoType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'DELETE-TODO':
            return state.filter(item => item.id !== action.id)
        case 'ADD-TODO': {
            // return [...state,
            //     {id: action.todoId, title: action.title, filter: 'all', entityStatus: "idle", addedDate: 'kj', order: 2}
            // ]
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-FILTER-TODO': {
            return state.map(item => item.id === action.id ? {...item, filter: action.filter} : item)
        }
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "idle"
            }))
        }
        case 'CHANGE-ENTITY-TODO': {
            return state.map(todo => todo.id === action.id ? {...todo, entityStatus: action.entityStatus}: todo)
        }
        case "CLEAR-DATA":
            return []
        default:
            return state
    }
}

