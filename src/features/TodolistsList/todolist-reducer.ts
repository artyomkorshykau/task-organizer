import {todolistsAPI, TodolistType} from "api/todolists-api";
import {AppThunk} from "app/store";
import {RequestStatusType, setAppStatusAC} from "app/app-reducer";
import {handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTaskTC} from "features/TodolistsList/tasks-reducer";
import {clearAppData, ClearAppDataType} from "common/actions/common.actions";


const initialState: TodolistDomainType[] = []



export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            // state.filter(f => f.id !== action.payload.id)
            const index = state.findIndex(el => el.id === action.payload.id)
            if (index > -1) {
                state.slice(index, 1)
            }

        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, todolist: string }>) {
            const index = state.findIndex(el => el.id === action.payload.todolist)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearAppData, (state, action) => {
                return action.payload.todos
            })
    }
})

export const todolistsReducer = slice.reducer

// -------------------------------ACTION CREATORS-------------------------------
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC,
} = slice.actions

// -------------------------------THUNK CREATORS-------------------------------

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolist()
        dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        res.data.forEach(el => {
            dispatch(fetchTaskTC(el.id))
        })
    } catch (error: any) {
        handleServerNetworkError(error.message, dispatch)
    }

}

export const removeTodolistTC = (todolistID: string): AppThunk => async dispatch => {
    try {
        await todolistsAPI.deleteTodolist(todolistID)
        dispatch(removeTodolistAC({id: todolistID}))
    } catch (error: any) {
        handleServerNetworkError(error.message, dispatch)
    }

}

export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(title)
        dispatch(addTodolistAC({todolist: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        handleServerNetworkError(error.message, dispatch)
    }

}

export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    try {
        await todolistsAPI.updateTodolist(title, todolistId)
        dispatch(changeTodolistTitleAC({title: title, todolist: todolistId}))
    } catch (error: any) {
        handleServerNetworkError(error.message, dispatch)
    }

}


// -------------------------------TYPES-------------------------------

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export  type ActionTodolistType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof clearAppData>

export type FilterValuesType = "all" | "active" | "completed";