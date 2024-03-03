import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearAppData} from "modules/actions/common.actions";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {ResultCode} from "common/enums/ResultCodeEnum";
import {RequestStatus} from "modules/app/model/types/app.types";
import {taskActions} from "modules/todolist-list/model/tasks/tasksSlice";
import {todolistApi} from "modules/todolist-list/api/todolistApi";
import {FilterValues, Todolist, TodolistDomain} from "modules/todolist-list/model/todolists/types/todolist.types";
import {UpdateTodolistTitleArg} from "modules/todolist-list/api/types/api.types";

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomain[],
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterValues }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            if(index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatus }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearAppData, (state, action) => {
                return action.payload.todos
            })
            .addCase(todosActions.fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(todosActions.removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index > -1) state.splice(index, 1)
            })
            .addCase(todosActions.addTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(todosActions.changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todolistId)
                state[index].title = action.payload.title
            })
    }
})

const fetchTodolists = createAppAsyncThunk<{ todolists: Todolist[] }, undefined>(`${slice.name}/fetchTodolists`, async (_, {dispatch}) => {
    const res = await todolistApi.getTodolist()
    const todos = res.data
    todos.forEach(el => {
        dispatch(taskActions.fetchTask(el.id))
    })
    return {todolists: todos}
})

const removeTodolist = createAppAsyncThunk<{ id: string }, { todolistID: string }>(`${slice.name}/removeTodolist`, async (param, _) => {
        await todolistApi.deleteTodolist(param.todolistID)
        return {id: param.todolistID}
})

const addTodolist = createAppAsyncThunk<{ todolist: Todolist }, { title: string }>(`${slice.name}/addTodolists`, async ({title}, {rejectWithValue}) => {
        const res = await todolistApi.createTodolist(title)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return {todolist: res.data.data.item}
        } else {
            return rejectWithValue(res.data)
        }
})

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArg, UpdateTodolistTitleArg>(`${slice.name}/changeTodolistTitle`, async ({todolistId, title}, _) => {
        await todolistApi.updateTodolist(todolistId, title)
        return {title: title, todolistId: todolistId}
})

export const todosActions = {
    changeTodolistTitle,
    addTodolist,
    removeTodolist,
    fetchTodolists,
    ...slice.actions
}
export const todolistsSlice = slice.reducer
