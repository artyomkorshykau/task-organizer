import { createAsyncThunk } from "@reduxjs/toolkit"
import {authAPI, FieldErrorsType, LoginParamsType, todolistsAPI, UpdateModelTaskType} from "api/todolists-api";
import {setIsLoggedIn} from "redux/auth-reducer";
import {setAppStatusAC} from "redux/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {isAxiosError} from "axios";
import {clearAppData} from "common/actions/common.actions";
import {AppRootStateType} from "redux/store";
import {UpdateDomainTaskModelType} from "redux/tasks-reducer";

// -------------------------------AUTH-THUNK-------------------------------
export const initializedAppTC = createAsyncThunk('app/initialized', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}))
    } else {

    }
})

// -------------------------------APP-THUNK-------------------------------
export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?:Array<FieldErrorsType>}}>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.auth(param)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(clearAppData({tasks: {}, todos: []}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    }
})

// -------------------------------TASKS-THUNK-------------------------------
export const fetchTaskTC = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todoListId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todoListId, tasks: res.data.items}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, id: string }) => {
    await todolistsAPI.deleteTask(param.todolistId, param.id)
    return {id: param.id, todolistId: param.todolistId}
})

export const addTaskTC = createAsyncThunk('tasks/addTasks', async (param: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistID, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('task/updateTask', async ({
                                                                           taskID,
                                                                           domainModel,
                                                                           todolistID
                                                                       }: { taskID: string, domainModel: UpdateDomainTaskModelType, todolistID: string }, {
                                                                           dispatch,
                                                                           getState,
                                                                           rejectWithValue
                                                                       }) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[todolistID].find(el => el.id === taskID)
    if (!task) {
        return rejectWithValue('task not found!')
    }
    const apiModel: UpdateModelTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }
    try {
        const res = await todolistsAPI.updateTask(todolistID, taskID, apiModel)
        if (res.data.resultCode === 0) {
            return {taskID, domainModel, todolistID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

// -------------------------------THUNK-------------------------------
export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolist()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        const todos = res.data
        todos.forEach(el => {
            dispatch(fetchTaskTC(el.id))
        })
        return {todolists: todos}
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist', async (param: { todolistID: string }, {
    dispatch,
    rejectWithValue
}) => {
    try {
        await todolistsAPI.deleteTodolist(param.todolistID)
        return {id: param.todolistID}
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

export const addTodolistTC = createAsyncThunk('todolist/addTodolists', async (param: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

export const changeTodolistTitleTC = createAsyncThunk('todolist/changeTodolistTitle', async (param: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    try {
        await todolistsAPI.updateTodolist(param.todolistId, param.title)
        return {title: param.title, todolist: param.todolistId}
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

