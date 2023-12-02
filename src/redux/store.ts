import thunkMiddleWare from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "features/auth/model/authSlice";
import {appSlice} from "features/app/model/appSlice";
import {todolistsSlice} from "features/todolist-list/model/todolists/todosSlice";
import {tasksSlice} from "features/todolist-list/model/tasks/tasksSlice";

export const store = configureStore({
    reducer: {
        todoList: todolistsSlice,
        tasks: tasksSlice,
        app: appSlice,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

// @ts-ignore
window.store = store