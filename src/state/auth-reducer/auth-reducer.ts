import {setErrorAC, setStatusAC} from "../app-reducer/app-reducer";
import {SetStatusType, SetErrorType} from "../app-reducer/app-reducer";
import {Dispatch} from "redux";
import {LoginType} from "../../pages/login/Login";
import {authApi} from "../../serverApi/todoListsApi";
import {handleServerAppError, hendleServerNetworkError} from "../../utils/error-utils";
import {setIsInitialized} from "../app-reducer/app-reducer";
import {clearDataAction} from "../todo-reducer/todo-type";

type LoginFlagType = {
    isLoggedIn: boolean
}


const initialState: LoginFlagType = {
    isLoggedIn: false
}

export const authReducer = (state: LoginFlagType = initialState, action: ActionType): LoginFlagType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginThunk = (data: LoginType) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        const response = await authApi.login(data)
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('successed'))
        } else {
            handleServerAppError(response.data, dispatch)
            dispatch(setStatusAC('successed'))
        }

    } catch (e) {
        const error = (e as {message: string})
        hendleServerNetworkError(error, dispatch)
    }
}

export const meThunk = () => async (dispatch: Dispatch) => {
    try {
        const response = await authApi.me()
        console.log(response)
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('successed'))
        } else {
            // handleServerAppError(response.data, dispatch)
            dispatch(setStatusAC('successed'))
        }

    } catch (e) {
        const error = (e as {message: string})
        hendleServerNetworkError(error, dispatch)
        console.log(error)
    }
    finally {
        dispatch(setIsInitialized(true))
    }
}

export const logOutThunk = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        const response = await authApi.logOut()
        console.log(response)
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(clearDataAction())
            dispatch(setStatusAC('successed'))
        } else {
            handleServerAppError(response.data, dispatch)
            dispatch(setStatusAC('successed'))
        }

    } catch (e) {
        const error = (e as {message: string})
        hendleServerNetworkError(error, dispatch)
    }
}

type ActionType = ReturnType<typeof setIsLoggedInAC>