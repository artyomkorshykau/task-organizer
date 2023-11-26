import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatus} from "features/app/model/types/appSlice.types";

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatus,
        error: null as string | null,
        initialized: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppInitialized: (state, action: PayloadAction<{ initialized: boolean }>) => {
            state.initialized = action.payload.initialized
        }
    },
})

export const appSlice = slice.reducer
export const appActions = slice.actions
