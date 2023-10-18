import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionTaskType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {ActionTodolistType, todolistsReducer} from "../features/TodolistsList/todolist-reducer";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";

// объедениям редьюсеры в один рутовый редьюсер с помощью combineReducers
const rootReducer = combineReducers({
    todoList: todolistsReducer,
    tasks: tasksReducer
})

//непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

//автоматическое определение типов
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionType>
export type AppActionType = ActionTaskType | ActionTodolistType

//это для того, что бы в консоли браузера обращаться к store
// @ts-ignore
window.store = store