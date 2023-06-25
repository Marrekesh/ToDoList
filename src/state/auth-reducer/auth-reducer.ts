import {setErrorAC, setStatusAC} from "../app-reducer/app-reducer";
import {Dispatch} from "redux";
import {LoginType} from "../../pages/login/Login";
import {authApi} from "../../serverApi/todoListsApi";

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
        }
    } catch (e) {

    }
}

type ActionType = ReturnType<typeof setIsLoggedInAC>