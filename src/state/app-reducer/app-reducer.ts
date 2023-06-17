
export type RequestStatusType = "idle" | "loading" | "successed" | "failed"

const initialState = {
    status: 'idle' as RequestStatusType,
    error: '' as null | string
}

type InitialStateType = typeof initialState


export const appRuducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetStatusType = ReturnType<typeof setStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>

export type ActionsType = SetStatusType | SetErrorType

export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)