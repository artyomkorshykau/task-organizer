import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateModelTaskType} from "api/todolists-api";
import {AppRootStateType, AppThunk} from "app/store";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "features/TodolistsList/todolist-reducer";
import {setAppStatusAC} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearAppData} from "common/actions/common.actions";

const initialState: TasksStateType = {}

// -------------------------------THUNK CREATORS-------------------------------
export const fetchTaskTC = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTasks(todoListId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoListId, tasks: res.data.items}

})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', (param: { todolistId: string, id: string }, thunkAPI) => {
    return todolistsAPI.deleteTask(param.todolistId, param.id)
        .then(() => ({id: param.id, todolistId: param.todolistId}))
})

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

// -------------------------------SLICE-------------------------------

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(setTodolistsAC, (state, action) => {
                action.payload.todolists.forEach(el => state[el.id] = [])
            })
            .addCase(clearAppData, (state, action) => {
                return action.payload.tasks
            })
            .addCase(fetchTaskTC.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(el => el.id === action.payload.id)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
    }

})

export const tasksReducer = slice.reducer

// -------------------------------ACTION CREATORS-------------------------------
export const {addTaskAC, updateTaskAC} = slice.actions

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
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>