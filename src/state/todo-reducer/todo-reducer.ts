import {appActions, RequestStatusType} from "../app-reducer/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {todoListApi} from "../../serverApi/todoListsApi";
import {createAppAsyncThunk} from "../../utils/createAppAthunkThunk";
import {hendleServerNetworkError} from "../../utils/error-utils";

//TYPES

export type filterType = 'all' | 'active' | 'completed'

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
        },
        addTodoList: (state, action: PayloadAction<{todoList: TodoListType}>) => {
            const newTodo = {...action.payload.todoList, filter: 'all', entityStatus: 'idle'} as TodoListDomainType
            state.unshift(newTodo)
        },
        removeTodoList: (state, action: PayloadAction<{id: string}>) => {
            const index = state.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        changeFilterTodo: (state, action:PayloadAction<{id: string, filter: filterType}>) => {
            const index = state.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTitleTodo: (state, action:PayloadAction<{id: string, title: string}>) => {
            const index = state.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeEntityStatus: (state, action:PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const index = state.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state[index].entityStatus= action.payload.entityStatus
        },
        clearData: (state) => {
            state.length = 0
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodoList.fulfilled, (state, action) => {

            })
    }

})

export const fetchTodoList = createAppAsyncThunk<{ todoLists: TodoListType[]}, void>(
    'todo/fetchTodoList', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            const response = await todoListApi.getTodoLists()

            return {todoLists: response.data}
        } catch (e) {
            hendleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setStatus({status: 'successed'}))
        }
    }
)

export const todoReducer = slice.reducer
export const todoActions = slice.actions
export const toDoThunk =  {fetchTodoList}




