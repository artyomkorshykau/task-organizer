import {AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatus} from "modules/app/model/types/app.types";
import {todosActions} from "modules/todolist-list/model/todolists/todosSlice";
import {authActions} from "modules/auth/model/authSlice";

export const InitialState = {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    initialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: InitialState,
    reducers: {
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(isPending(todosActions.fetchTodolists),
                (state) => {
                    state.status = 'loading'
                })
            .addMatcher(isFulfilled || isRejected(todosActions.fetchTodolists),
                (state) => {
                    state.status = 'idle'
                })
            .addMatcher(isRejected, (state, action: AnyAction) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addMatcher(isRejected, (state, action: AnyAction) => {
                state.status = 'failed'
                if (action.payload) {
                    state.error = action.error.message ? action.error.message : 'Some error occured'
                }
            })
            .addMatcher(isFulfilled(authActions.initializedApp), (state, action) => {
                state.initialized = true
            })
    }
})

export const appSlice = slice.reducer
export const appActions = slice.actions
