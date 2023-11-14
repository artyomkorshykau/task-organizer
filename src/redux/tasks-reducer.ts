import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateModelTaskType} from "api/todolists-api";
import {AppRootStateType} from "redux/store";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "redux/todolist-reducer";
import {setAppStatusAC} from "redux/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clearAppData} from "common/actions/common.actions";
import {isAxiosError} from "axios";


// -------------------------------THUNK-------------------------------
export const fetchTaskTC = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todoListId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todoListId, tasks: res.data.items}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, id: string }) => {
    await todolistsAPI.deleteTask(param.todolistId, param.id)
    return {id: param.id, todolistId: param.todolistId}
})

export const addTaskTC = createAsyncThunk('tasks/addTasks', async (param: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistID, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('task/updateTask', async ({
                                                                           taskID,
                                                                           domainModel,
                                                                           todolistID
                                                                       }: { taskID: string, domainModel: UpdateDomainTaskModelType, todolistID: string }, {
                                                                           dispatch,
                                                                           getState,
                                                                           rejectWithValue
                                                                       }) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[todolistID].find(el => el.id === taskID)
    if (!task) {
        return rejectWithValue('task not found!')
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
    try {
        const res = await todolistsAPI.updateTask(todolistID, taskID, apiModel)
        if (res.data.resultCode === 0) {
            return {taskID, domainModel, todolistID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
        return rejectWithValue(null)
    }
})

// -------------------------------SLICE-------------------------------

const slice = createSlice({
    name: 'task',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
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
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistID]
                const index = tasks.findIndex(el => el.id === action.payload.taskID)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
    }
})


export const tasksReducer = slice.reducer


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