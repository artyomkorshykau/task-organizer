import thunkMiddleWare, {ThunkAction} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {TodosAction} from "features/TodolistsList/Todolist/model/types/todosSlice.types";
import {AppAction} from "features/app/model/types/appSlice.types";
import {tasksSlice} from "features/TodolistsList/Todolist/ui/Task/model/tasksSlice";
import {authSlice} from "features/auth/model/authSlice";
import {appSlice} from "features/app/model/appSlice";
import {todolistsSlice} from "features/TodolistsList/Todolist/model/todosSlice";


export const store = configureStore({
    reducer: {
        todoList: todolistsSlice,
        tasks: tasksSlice,
        app: appSlice,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store