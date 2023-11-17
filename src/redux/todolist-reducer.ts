import {TodolistType} from "api/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearAppData} from "common/actions/common.actions";
import {RequestStatusType} from "./app-reducer";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "redux/thunks/thunks";

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
                    state.splice(index, 1)
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