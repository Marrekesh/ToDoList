
import {TaskPriorities, TaskStatus, TaskType, todoListApi} from "../../serverApi/todoListsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoActions} from "../todo-reducer/todo-reducer";
import {Dispatch} from "redux";
import {appActions} from "../app-reducer/app-reducer";
import {hendleServerNetworkError} from "../../utils/error-utils";
import tasks from "../../components/tasks/Tasks";
import {AppRootStateType, AppThunkDispatchType} from "../store/store";
import {createAppAsyncThunk} from "../../utils/createAppAthunkThunk";

// TYPES

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatus
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

// REDUCER


const initialState: TaskStateType = {}


const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{task: TaskType}>) => {
            let taskForCurrentTodolist = state[action.payload.task.todoListId] as TaskType[]
            taskForCurrentTodolist.unshift(action.payload.task)
        },
        removeTask: (state, action: PayloadAction<{taskId: string, todoListId: string}>) => {
            let taskForCurrentTodolist = state[action.payload.todoListId]
            const index = taskForCurrentTodolist.findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1) state.taskForCurrentTodolist.splice(index, 1)

        },
        updateTask: (state, action: PayloadAction<{todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType}>) => {
            let tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1 ) tasks[index] = {...tasks[index], ...action.payload.domainModel}
        },
        clearData: (state) => {
            Object.keys(state).forEach(key => delete state[key]);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })

            /// From toDo
            .addCase(todoActions.addTodoList, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(todoActions.removeTodoList, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todoActions.setTodoLists, (state, action) => {
                action.payload.todoLists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
    }

})


// THUNKS
//1 - что возвращает
//2 - что принимает
//3 рутстейты, диспачи
export const fetchTask = createAppAsyncThunk<{tasks: TaskType[], todolistId: string}, string>(
    'task/fetchTask',
    async (todolistId, ThunkAPI) => {
    const {dispatch, rejectWithValue} = ThunkAPI

    try {
        dispatch(appActions.setStatus({status: 'loading'}))
        const res = await todoListApi.getTasks(todolistId)
        const tasks = res.data.items

        dispatch(appActions.setStatus({status: 'successed'}))
        // dispatch(setTaskAC(tasks, todolistId))
        return {tasks, todolistId}
    } catch (e: any) {
        hendleServerNetworkError(e, dispatch);
        return rejectWithValue(null)
    }

})

export const addtTask = createAppAsyncThunk<{}>()


export const addtTask = (title: string, todoId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todoListApi.postTask(title, todoId)
        .then(res => {
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(addTaskAction(res.data.data.item))
            } else if (res.data.messages.length) {
                dispatch(appActions.setError({error: res.data.messages[0]}))
            }
        })
        .finally(() => dispatch(appActions.setStatus({status: 'successed'})))

}

export const taskReducer = slice.reducer
export const taskActions = slice.actions
export const taskThunks = {fetchTask}
