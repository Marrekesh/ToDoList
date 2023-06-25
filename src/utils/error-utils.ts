import {setErrorAC, setStatusAC} from "../state/app-reducer/app-reducer";
import {Dispatch} from "redux";


export const hendleServerNetworkError = (dispatch: Dispatch, error: {message: string}) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}