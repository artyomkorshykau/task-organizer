import {createSlice, isAnyOf, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {authAPI} from "features/auth/api/authApi";
import {ResultCode} from "common/enums/ResultCodeEnum";
import {LoginParams} from "features/auth/ui/login/types/login.types";
import {clearAppData} from "features/actions/common.actions";

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(isAnyOf(
                    authActions.login.fulfilled,
                    authActions.logout.fulfilled,
                    authActions.initializedApp.fulfilled),
                (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                })
    }
})

const initializedApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/initialized`, async (_, {rejectWithValue}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
        return {isLoggedIn: true}
    } else {
        return rejectWithValue(res.data)
    }
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(`${slice.name}/login`, async (param, {rejectWithValue}) => {
    const res = await authAPI.auth(param)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
        return {isLoggedIn: true}
    } else {
        return rejectWithValue(res.data)
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, {
    dispatch,
    rejectWithValue
}) => {
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(clearAppData({tasks: {}, todos: []}))
        return {isLoggedIn: false}
    } else {
        return rejectWithValue(res.data)
    }
})


export const authActions = {initializedApp, login, logout, ...slice.actions}
export const authSlice = slice.reducer

