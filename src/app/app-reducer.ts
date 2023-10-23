import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS' : {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET-INITIALIZED' :
            return {...state, initialized: action.value}
        default:
            return {...state}
    }
}

// -------------------------------ACTION CREATORS-------------------------------
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error}) as const
export const setAppInitializedAC = (value: boolean) =>
    ({type: 'APP/SET-INITIALIZED', value}) as const

// -------------------------------THUNK CREATORS-------------------------------
export const initializedAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                } else {

                }
                dispatch(setAppInitializedAC(true))
            })
    }
}

// -------------------------------TYPES-------------------------------
type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionAppType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>