import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearAppData} from "actions/common.actions";
import {TodolistDomain} from "features/TodolistsList/Todolist/model/types/todosSlice.types";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {Todolist} from "features/TodolistsList/Todolist/types/todolist.types";
import {appActions} from "features/app/model/appSlice";
import {todolistApi} from "features/TodolistsList/Todolist/api/todolistApi";
import {serverNetworkErrorHandler} from "common/utils/serverNetworkErrorHandler";
import {ResultCode} from "common/enums/ResultCodeEnum";
import {serverAppErrorHandler} from "common/utils/serverAppErrorHandler";
import {isAxiosError} from "axios";
import {taskThunks} from "features/TodolistsList/Todolist/ui/Task/model/tasksSlice";

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomain[],
    reducers: {
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, todolist: string }>) {
            const index = state.findIndex(el => el.id === action.payload.todolist)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValues }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].filter = action.payload.filter
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearAppData, (state, action) => {
                return action.payload.todos
            })
            .addCase(todosThunks.fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(todosThunks.removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index > -1) state.splice(index, 1)
            })
            .addCase(todosThunks.addTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(todosThunks.changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todolist)
                state[index].title = action.payload.title
            })
    }
})

// -------------------------------TODOS-THUNK-------------------------------
const fetchTodolists = createAppAsyncThunk<{ todolists: Todolist[] }, undefined>(`${slice.name}/fetchTodolists`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistApi.getTodolist()
        dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
        const todos = res.data
        todos.forEach(el => {
            dispatch(taskThunks.fetchTask(el.id))
        })
        return {todolists: todos}
    } catch (error) {
        serverNetworkErrorHandler(error, dispatch)
        return rejectWithValue(null)
    }
})

const removeTodolist = createAppAsyncThunk<{ id: string }, { todolistID: string }>(`${slice.name}/removeTodolist`, async (param, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        await todolistApi.deleteTodolist(param.todolistID)
        return {id: param.todolistID}
    } catch (error) {
        serverNetworkErrorHandler(error, dispatch)
        return rejectWithValue(null)
    }
})

const addTodolist = createAppAsyncThunk<{ todolist: Todolist }, { title: string }>(`${slice.name}/addTodolists`, async ({title}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatusAC({status: 'loading'}))
        const res = await todolistApi.createTodolist(title)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            serverAppErrorHandler(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            serverNetworkErrorHandler(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

const changeTodolistTitle = createAppAsyncThunk<{ title: string, todolist: string }, { title: string, todolistId: string }>(`${slice.name}/changeTodolistTitle`, async (param, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        await todolistApi.updateTodolist(param.todolistId, param.title)
        return {title: param.title, todolist: param.todolistId}
    } catch (error) {
        serverNetworkErrorHandler(error, dispatch)
        return rejectWithValue(null)
    }
})

export const todosThunks = {changeTodolistTitle, addTodolist, removeTodolist, fetchTodolists}
export const todosActions = slice.actions
export const todolistsSlice = slice.reducer

export type FilterValues = "all" | "active" | "completed";