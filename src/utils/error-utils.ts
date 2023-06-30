
import {Dispatch} from "redux";
import {appActions} from "../state/app-reducer/app-reducer";
import axios, {AxiosError} from "axios";

export const handleServerAppError = (data: any, dispatch: Dispatch): void => {
    if (data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'some error accured'}))
    }
    // dispatch(setErrorAC('failed'))appActions.
}

export const _hendleServerNetworkError = ( error: {message: string}, dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'failed'}))
    dispatch(appActions.setError({error: error.message}))
}

export const hendleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setError({error}))
    } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setStatus({status: 'failed'}))
}