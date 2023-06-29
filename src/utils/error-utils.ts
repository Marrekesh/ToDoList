
import {Dispatch} from "redux";
import {appActions} from "../state/app-reducer/app-reducer";

export const handleServerAppError = (data: any, dispatch: Dispatch): void => {
    if (data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'some error accured'}))
    }
    // dispatch(setErrorAC('failed'))appActions.
}

export const hendleServerNetworkError = ( error: {message: string}, dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'failed'}))
    dispatch(appActions.setError({error: error.message}))
}