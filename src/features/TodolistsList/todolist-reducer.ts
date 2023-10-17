import {Dispatch} from "redux";
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
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id: id}) as const

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist}) as const

export const changeTodolistTitleAC = (todolist: TodolistType) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolist}) as const

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const

export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todolists}) as const


// -------------------------------THUNK CREATORS-------------------------------

export const fetchTodolistsTC = (): AppThunk => (dispatch: Dispatch) => todolistsAPI.getTodolist()
    .then(res => {
        dispatch(setTodolistsAC(res.data))
    })

export const removeTodolistTC = (todolistID: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(removeTodolistAC(todolistID))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolist(title, todolistId)
        .then(res => {
            dispatch(changeTodolistTitleAC(res.data.data.item))
        })
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