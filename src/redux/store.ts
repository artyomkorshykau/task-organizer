import thunkMiddleWare from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "modules/auth/model/authSlice";
import {appSlice} from "modules/app/model/appSlice";
import {todolistsSlice} from "modules/todolist-list/model/todolists/todosSlice";
import {tasksSlice} from "modules/todolist-list/model/tasks/tasksSlice";

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