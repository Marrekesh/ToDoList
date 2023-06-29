import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "successed" | "failed"

// const initialState = {
//     status: 'idle' as RequestStatusType,
//     error: '' as null | string,
//     isInitialized: false
// }


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: '' as null | string,
        isInitialized: false
    },
    reducers: {
        setStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{error: null | string}>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
// type InitialStateType = typeof initialState


// export const appRuducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case "APP/SET-STATUS":
//             return {...state, status: action.status}
//         case "APP/SET-ERROR":
//             return {...state, error: action.error}
//         case "APP/SET-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }

export type SetStatusType = ReturnType<typeof setStatusAC>
// export type SetErrorType = ReturnType<typeof setErrorAC>
// export type SetIsInitialized = ReturnType<typeof setIsInitialized>
//
// export type ActionsType = SetStatusType | SetErrorType | SetIsInitialized

export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
// export const setIsInitialized = (isInitialized: boolean) => ({type: "APP/SET-INITIALIZED", isInitialized} as const)