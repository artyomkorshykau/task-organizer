import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionTaskType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {ActionTodolistType, todolistsReducer} from "../features/TodolistsList/todolist-reducer";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todoList: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionType>
export type AppActionType = ActionTaskType | ActionTodolistType
export const useAppDispatch = ()=>useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store