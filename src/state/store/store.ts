import {taskReducer} from "../tasks-reducer";
import {todoReducer} from "../todo-reducer";
import {applyMiddleware, combineReducers, createStore, AnyAction, legacy_createStore} from "redux";
import {ThunkDispatch} from "redux-thunk";
import thunk from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    task: taskReducer,
    todo: todoReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const AppDispatch = () => useDispatch<AppThunkDispatchType>()

// export type AppDispatch = typeof store.dispatch