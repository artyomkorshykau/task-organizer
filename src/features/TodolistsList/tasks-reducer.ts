import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateModelTaskType} from "../../api/todolists-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {Dispatch} from "redux";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {setErrorAC, setStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.id)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.id
                    ? {...el, status: action.status}
                    : el)
            }
        case 'CHANGE-TITLE' :
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.id
                    ? {...el, title: action.title}
                    : el)
            }
        case 'ADD-TODOLIST' :
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST' :
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS' : {
            const copyState = {...state}
            action.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case 'SET-TASKS' : {
            return {...state, [action.todoListId]: action.tasks}
        }
        default:
            return state
    }
}


// -------------------------------ACTION CREATORS-------------------------------
export const removeTaskAC = (id: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', id, todolistId}) as const

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task}) as const

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-STATUS', id, todolistId, status}) as const

export const changeTitleAC = (id: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TITLE', id, title, todolistId}) as const

export const setTasksAC = (todoListId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todoListId, tasks}) as const


// -------------------------------THUNK CREATORS-------------------------------
export const fetchTaskTC = (todoListId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTasks(todoListId)
            .then(res => {
                dispatch(setTasksAC(todoListId, res.data.items))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (todolistId: string, id: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, id)
            .then(() => {
                dispatch(removeTaskAC(id, todolistId))
            })
    }
}

export const addTaskTC = (title: string, todolistID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTask(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}

export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, todolistID: string): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistID].find(el => el.id === taskID)
        if (!task) {
            alert('task not found!')
            return
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
        todolistsAPI.updateTask(todolistID, taskID, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(taskID, apiModel.status, todolistID))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}


// -------------------------------TYPES-------------------------------
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}

export type ActionTaskType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTitleAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: TasksStateType = {}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
