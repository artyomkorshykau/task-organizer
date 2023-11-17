import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginTC, logoutTC} from "redux/thunks/thunks";

const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false
            })
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true
            })
    }
})

export const authReducer = slice.reducer
export const setIsLoggedIn = slice.actions.setIsLoggedIn

