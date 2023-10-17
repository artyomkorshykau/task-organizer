import {FilterValuesType} from "../AppRedux";
import {Dispatch} from "redux";
import {todolistsAPI, TodolistsType} from "../api/todolists-api";
import {AppThunk} from "./store";


const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistType): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.todolist.id ? {...el, title: action.todolist.title} : el)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'SET-TODOLISTS' : {
            return action.todolists.map(el => ({...el, filter: 'all'}))
        }
        default:

            return state
    }
}


// -------------------------------ACTION CREATORS-------------------------------
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id: id}) as const
export const addTodolistAC = (todolist: TodolistsType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodolistTitleAC = (todolist: TodolistsType) => ({type: 'CHANGE-TODOLIST-TITLE', todolist}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
}) as const


// -------------------------------THUNK CREATORS-------------------------------
export const setTodolistsAC = (todolists: TodolistsType[]) => ({type: 'SET-TODOLISTS', todolists}) as const
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch:Dispatch) => todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistID: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTodolists(todolistID)
            .then(res => {
                dispatch(removeTodolistAC(todolistID))
            })
    }
}
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.createTodolists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolists(title, todolistId)
            .then(res => {
                dispatch(changeTodolistTitleAC(res.data.data.item))
            })
    }
}


// -------------------------------TYPES-------------------------------
export  type ActionTodolistType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>


export type TodolistDomainType = TodolistsType & { filter: FilterValuesType }