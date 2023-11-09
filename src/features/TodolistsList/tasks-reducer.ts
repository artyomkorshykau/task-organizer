import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateModelTaskType} from "api/todolists-api";
import {AppRootStateType, AppThunk} from "app/store";
import {addTodolistAC, clearTodosDataAC, removeTodolistAC, setTodolistsAC} from "features/TodolistsList/todolist-reducer";
import {setAppStatusAC} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{
            taskId: string,
            model: UpdateDomainTaskModelType,
            todolistId: string
        }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) {
            state[action.payload.todoListId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(el => state[el.id] = [])
        })
        builder.addCase(clearTodosDataAC, () => {
            return {}
        })
    }

})

export const tasksReducer = slice.reducer

// -------------------------------ACTION CREATORS-------------------------------
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions


// -------------------------------THUNK CREATORS-------------------------------
export const fetchTaskTC = (todoListId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTasks(todoListId)
            .then(res => {
                dispatch(setTasksAC({todoListId: todoListId, tasks: res.data.items}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export const removeTaskTC = (todolistId: string, id: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, id)
            .then(() => {
                dispatch(removeTaskAC({id: id, todolistId: todolistId}))
            })
    }
}

export const addTaskTC = (title: string, todolistID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTask(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
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
                    dispatch(updateTaskAC({taskId: taskID, model: apiModel, todolistId: todolistID}))
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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ActionTaskType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>