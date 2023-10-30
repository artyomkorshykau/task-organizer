import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    initialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ initialized: boolean }>) {
            state.initialized = action.payload.initialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppInitializedAC, setAppStatusAC, setAppErrorAC} = slice.actions

// -------------------------------THUNK CREATORS-------------------------------
export const initializedAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn({value: true}))
                } else {

                }
                dispatch(setAppInitializedAC({initialized: true}))
            })
    }
}

// -------------------------------TYPES-------------------------------
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionAppType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>