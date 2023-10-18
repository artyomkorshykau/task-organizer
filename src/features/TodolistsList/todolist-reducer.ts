import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";


const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistType): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {...action.todolist, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.todolist ? {...el, title: action.title} : el)
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
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id: id}) as const

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist}) as const

export const changeTodolistTitleAC = (title: string, todolist: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title, todolist}) as const

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const

export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todolists}) as const


// -------------------------------THUNK CREATORS-------------------------------

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.getTodolist()
        dispatch(setTodolistsAC(res.data))
    } catch (err) {
        throw new Error()
    }

}

export const removeTodolistTC = (todolistID: string): AppThunk => async dispatch => {
    try {
        await todolistsAPI.deleteTodolist(todolistID)
        dispatch(removeTodolistAC(todolistID))
    } catch (err) {
        throw new Error()
    }

}

export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.createTodolist(title)
        dispatch(addTodolistAC(res.data.data.item))
    } catch (err) {
        throw new Error()
    }

}

export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.updateTodolist(title, todolistId)
        dispatch(changeTodolistTitleAC(title, todolistId))
    } catch (err) {
        throw new Error()
    }

}


// -------------------------------TYPES-------------------------------
export  type ActionTodolistType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>


export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

export type FilterValuesType = "all" | "active" | "completed";