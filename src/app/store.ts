import {AnyAction, combineReducers} from "redux";
import {ActionTaskType, tasksReducer} from "features/TodolistsList/tasks-reducer";
import {ActionTodolistType, todolistsReducer} from "features/TodolistsList/todolist-reducer";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionAppType, appReducer} from "./app-reducer";
import {authReducer} from "features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объедениям редьюсеры в один рутовый редьюсер с помощью combineReducers
const rootReducer = combineReducers({
    todoList: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

//непосредственно создаём store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

//автоматическое определение типов
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionType>
export type AppActionType =
    | ActionTaskType
    | ActionTodolistType
    | ActionAppType

//это для того, что бы в консоли браузера обращаться к store
// @ts-ignore
window.store = store