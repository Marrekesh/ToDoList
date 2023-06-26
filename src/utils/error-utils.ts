import {setErrorAC, setStatusAC} from "../state/app-reducer/app-reducer";
import {Dispatch} from "redux";
import {SetErrorType, SetStatusType} from "../state/app-reducer/app-reducer";

export const handleServerAppError = (data: any, dispatch: Dispatch<SetErrorType | SetStatusType>): void => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('some error accured'))
    }
    // dispatch(setErrorAC('failed'))
}

export const hendleServerNetworkError = ( error: {message: string}, dispatch: Dispatch) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}