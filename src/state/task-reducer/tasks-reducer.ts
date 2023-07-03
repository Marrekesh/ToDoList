
import {TaskPriorities, TaskStatus, TaskType, todoListApi, UpdateTaskModel} from "../../serverApi/todoListsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoActions, toDoThunk} from "../todo-reducer/todo-reducer";
import {Dispatch} from "redux";
import {appActions} from "../app-reducer/app-reducer";
import {handleServerAppError, hendleServerNetworkError} from "../../utils/error-utils";
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
        clearData: (state) => {
            Object.keys(state).forEach(key => delete state[key]);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                let taskForCurrentTodolist = state[action.payload.task.todoListId] as TaskType[]
                taskForCurrentTodolist.unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                let taskForCurrentTodolist = state[action.payload.todoListId]
                const index = taskForCurrentTodolist.findIndex(todo => todo.id === action.payload.taskId)
                if (index !== -1) taskForCurrentTodolist.splice(index, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                let tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(todo => todo.id === action.payload.taskId)
                if (index !== -1 ) tasks[index] = {...tasks[index], ...action.payload.domainModel}
            })
            /// From toDo
            .addCase(toDoThunk.addTodoList.fulfilled, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(toDoThunk.removeTodoList.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(toDoThunk.fetchTodoList.fulfilled, (state, action) => {
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

export const addTask = createAppAsyncThunk<{ task: TaskType },{title: string, todoId: string}>
    ('task/addTask', async (arg,thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            const response = await todoListApi.postTask(arg.title, arg.todoId)
            if (response.data.resultCode === 0) {
                dispatch(appActions.setStatus({status: "successed"}))
                // dispatch(taskActions.addTask(response.data.data.item))
                const task = response.data.data.item
                return {task}

            } else {
                // dispatch(appActions.setError({error: response.data.messages[0]}))
                hendleServerNetworkError(response.data.messages, dispatch);
                return rejectWithValue(null)
            }


        } catch (e) {
            hendleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        }
    })

export const removeTask = createAppAsyncThunk<{taskId: string, todoListId: string}, {taskId: string, todoListId: string}>(
    'task/removeTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            const response = await todoListApi.deleteTask(arg.taskId, arg.todoListId)
            if (response.data.resultCode === 0) {
                console.log(response)
                dispatch(appActions.setStatus({status: "successed"}))
                return arg

            } else {
                hendleServerNetworkError(response.data.messages, dispatch);
                return rejectWithValue(null)
            }

        } catch (e) {
            hendleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setStatus({status: 'idle'}))
        }

    }
)

export const updateTask = createAppAsyncThunk<{
        todolistId: string,
        taskId: string,
        domainModel: UpdateDomainTaskModelType
    },
    {
        taskId: string,
        domainModel: UpdateDomainTaskModelType,
        todolistId: string
    }>(
    'task/updateTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI

        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            const state = getState()
            const task = state.task[arg.todolistId].find(t => t.id === arg.taskId)
            if (!task) {
                //throw new Error("task not found in the state");
                console.warn('task not found in the state')
                return rejectWithValue(null)
            }
            const apiModel: UpdateTaskModel = {
                deadline: task.deadline,
                description:task.description,
                completed: task.completed,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...arg.domainModel
            }

            const response = await todoListApi.updateTask(arg.todolistId, arg.taskId, apiModel)
            if (response.data.resultCode === 0) {
                const {todolistId,taskId, domainModel} = arg
                return arg
            } else {
                hendleServerNetworkError(response.data.messages, dispatch);
                return rejectWithValue(null)

            }
        } catch (e) {
            hendleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setStatus({status: 'idle'}))
        }

    }
)


export const taskReducer = slice.reducer
export const taskActions = slice.actions
export const taskThunks = {fetchTask, addTask, removeTask, updateTask}
