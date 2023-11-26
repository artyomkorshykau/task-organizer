import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {authAPI} from "features/auth/api/authApi";
import {ResultCode} from "common/enums/ResultCodeEnum";
import {serverAppErrorHandler} from "common/utils/serverAppErrorHandler";
import {appActions} from "features/app/model/appSlice";
import {thunkTryCatch} from "common/utils/thunkTryCatch";
import {LoginParams} from "features/auth/ui/Login/login.types";
import {clearAppData} from "actions/common.actions";

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
            .addCase(authThunks.logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
            .addCase(authThunks.login.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(authThunks.initializedApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value
            })
    }
})

// -------------------------------AUTH-THUNK-------------------------------
const initializedApp = createAppAsyncThunk<{ value: boolean }, undefined>(`${slice.name}/initialized`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return {value: true}
        } else {
            return rejectWithValue(null)
        }
    }).finally(() => {
        dispatch(appActions.setAppInitialized({initialized: true}))
    })
})

const login = createAppAsyncThunk<undefined, LoginParams>(`${slice.name}/login`, async (param, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.auth(param)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return undefined
        } else {
            serverAppErrorHandler(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            dispatch(clearAppData({tasks: {}, todos: []}))
            return {isLoggedIn: false}
        } else {
            serverAppErrorHandler(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})


export const authThunks = {initializedApp, login, logout}
export const authSlice = slice.reducer

