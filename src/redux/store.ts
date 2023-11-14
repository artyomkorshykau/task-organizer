import {AnyAction, combineReducers} from "redux";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionAppType, appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {ActionTodolistType, todolistsReducer} from "redux/todolist-reducer";
import {tasksReducer} from "redux/tasks-reducer"
import {authReducer} from "redux/auth-reducer";

export const store = configureStore({
    reducer: {
        todoList: todolistsReducer,
        tasks: tasksReducer,
        app: appReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionType>
export type AppActionType =
    | ActionTodolistType
    | ActionAppType

// @ts-ignore
window.store = store