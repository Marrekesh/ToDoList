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
                console.log('dodo reducer')
                return action.payload.todoLists.map((item) => ({...item, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                const newTodo = {...action.payload.todoList, filter: 'all', entityStatus: 'idle'} as TodoListDomainType
                state.unshift(newTodo)
            })
            .addCase(removeTodoList.fulfilled, (state, action) => {
                const index = state.findIndex((item) => item.id === action.payload.todolistId)
                if (index !== -1) state.splice(index, 1)
            })
    }

})

const fetchTodoList = createAppAsyncThunk<{ todoLists: TodoListType[]}, void>(
    'todo/fetchTodoList', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            const response = await todoListApi.getTodoLists()
            console.log(response)
            return {todoLists: response.data}
        } catch (e) {
            hendleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setStatus({status: 'successed'}))
        }
    })

const addTodoList = createAppAsyncThunk<{todoList: TodoListType}, { title: string }>(
    'todo/addTodoList', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            const response = await todoListApi.postTodoLists(arg.title)
            const todoList = response.data.data.item
            return {todoList}
        } catch (e) {
            hendleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setStatus({status: 'successed'}))
        }

    }
)

const removeTodoList = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    'todo/removeTodoList', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            dispatch(todoActions.changeEntityStatus({id: arg.todolistId, entityStatus: "loading"}))
            const response = await todoListApi.deleteTodo(arg.todolistId)
            if (response.status === 200) {
                const todolistId = arg.todolistId
                return {todolistId}
            } else {
                hendleServerNetworkError(response.data.messages, dispatch);
                return rejectWithValue(null)
            }
        } catch (e) {
            hendleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setStatus({status: 'successed'}))
            dispatch(todoActions.changeEntityStatus({id: arg.todolistId, entityStatus: "idle"}))
        }
    }
)



export const todoReducer = slice.reducer
export const todoActions = slice.actions
export const toDoThunk =  {fetchTodoList, addTodoList,removeTodoList}




