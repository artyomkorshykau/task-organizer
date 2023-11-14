import {todolistsAPI, TodolistType} from "api/todolists-api";
import {handleServerNetworkError} from "utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearAppData} from "common/actions/common.actions";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AppThunk} from "./store";
import {fetchTaskTC} from "redux/tasks-reducer";
import {isAxiosError} from "axios";


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
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolist: res.data.data.item}
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
        await todolistsAPI.updateTodolist(param.title, param.todolistId)
        return {title: param.title, todolist: param.todolistId}
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})


export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, todolist: string }>) {
            const index = state.findIndex(el => el.id === action.payload.todolist)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].filter = action.payload.filter
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearAppData, (state, action) => {
                return action.payload.todos
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index > -1) {
                    state.slice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todolist)
                state[index].title = action.payload.title
            })
    }
})

export const todolistsReducer = slice.reducer

// -------------------------------ACTION CREATORS-------------------------------
export const {
    changeTodolistTitleAC,
    changeTodolistFilterAC,
} = slice.actions


// -------------------------------TYPES-------------------------------

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export  type ActionTodolistType =
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof clearAppData>

export type FilterValuesType = "all" | "active" | "completed";