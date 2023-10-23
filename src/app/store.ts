import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionTaskType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {ActionTodolistType, todolistsReducer} from "../features/TodolistsList/todolist-reducer";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionAppType, appReducer} from "./app-reducer";
import {ActionAuthType, authReducer} from "../features/Login/auth-reducer";

// объедениям редьюсеры в один рутовый редьюсер с помощью combineReducers
const rootReducer = combineReducers({
    todoList: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

//непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

//автоматическое определение типов
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionType>
export type AppActionType =
    | ActionTaskType
    | ActionTodolistType
    | ActionAppType
    | ActionAuthType

//это для того, что бы в консоли браузера обращаться к store
// @ts-ignore
window.store = store