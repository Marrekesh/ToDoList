import {taskReducer} from "../task-reducer/tasks-reducer";
import {todoReducer} from "../todo-reducer/todo-reducer";
import {appRuducer} from "../app-reducer/app-reducer";
import {applyMiddleware, combineReducers, createStore, AnyAction, legacy_createStore} from "redux";
import {ThunkDispatch} from "redux-thunk";
import thunk from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    task: taskReducer,
    todo: todoReducer,
    app: appRuducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const AppDispatch = () => useDispatch<AppThunkDispatchType>()

// export type AppDispatch = typeof store.dispatch