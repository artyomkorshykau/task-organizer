import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializedAppTC} from "redux/thunks/thunks";

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        initialized: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initializedAppTC.fulfilled, (state) => {
                state.initialized = true
            })
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions

// -------------------------------TYPES-------------------------------
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionAppType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>