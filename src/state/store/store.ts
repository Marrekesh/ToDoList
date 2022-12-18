import {taskReducer} from "../tasks-reducer";
import {todoReducer} from "../todo-reducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
    task: taskReducer,
    todo: todoReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch