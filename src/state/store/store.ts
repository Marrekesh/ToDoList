import {taskReducer} from "../task-reducer/tasks-reducer";
import {todoReducer} from "../todo-reducer/todo-reducer";
import {appReducer} from "../app-reducer/app-reducer";
import {applyMiddleware, combineReducers, createStore, AnyAction, legacy_createStore} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import thunk from "redux-thunk";
import {useDispatch} from "react-redux";
import {authReducer} from "../auth-reducer/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    task: taskReducer,
    todo: todoReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType= void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// export const AppDispatch = () => useDispatch<AppThunkDispatchType>()

// export type AppDispatch = typeof store.dispatch