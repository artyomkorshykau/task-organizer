import {createSlice} from "@reduxjs/toolkit";
import {clearAppData} from "actions/common.actions";
import {
    TasksState,
    TaskType,
    UpdateDomainTaskModel,
    UpdateModelTask
} from "features/TodolistsList/Todolist/ui/Task/types/task.types";
import {todosThunks} from "features/TodolistsList/Todolist/model/todosSlice";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {todolistApi} from "features/TodolistsList/Todolist/api/todolistApi";
import {ResultCode} from "common/enums/ResultCodeEnum";
import {serverAppErrorHandler} from "common/utils/serverAppErrorHandler";
import {AppRootState} from "redux/store";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

const slice = createSlice({
    name: 'task',
    initialState: {} as TasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todosThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todosThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todosThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(el => state[el.id] = [])
            })
            .addCase(clearAppData, (state, action) => {
                return action.payload.tasks
            })
            .addCase(taskThunks.fetchTask.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks
            })
            .addCase(taskThunks.removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(el => el.id === action.payload.taskId)
                if (index > -1) tasks.splice(index, 1)
            })
            .addCase(taskThunks.addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(taskThunks.updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistID]
                const index = tasks.findIndex(el => el.id === action.payload.taskID)
                if (index > -1) tasks[index] = {...tasks[index], ...action.payload.domainModel}
            })
    }
})

// -------------------------------TASKS-THUNK-------------------------------
const fetchTask = createAppAsyncThunk<{ tasks: TaskType[], todoListId: string }, string>(`${slice.name}/fetchTasks`, async (todoListId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistApi.getTasks(todoListId)
        return {todoListId, tasks: res.data.items}
    })
})

type RemoveTaskType = {
    todolistId: string,
    taskId: string
}

const removeTask = createAppAsyncThunk<RemoveTaskType, RemoveTaskType>(`${slice.name}/removeTask`, async (param, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistApi.deleteTask(param.todolistId, param.taskId)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return {taskId: param.taskId, todolistId: param.todolistId}
        } else {
            serverAppErrorHandler(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistID: string, title: string }>(`${slice.name}/addTasks`, async (param, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistApi.createTask(param.todolistID, param.title)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return {task: res.data.data.item}
        } else {
            serverAppErrorHandler(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

type UpdateTaskType = {
    taskID: string,
    domainModel: UpdateDomainTaskModel,
    todolistID: string
}

const updateTask = createAppAsyncThunk<UpdateTaskType, UpdateTaskType>(`${slice.name}/updateTask`, async ({
                                                                                                              taskID,
                                                                                                              domainModel,
                                                                                                              todolistID
                                                                                                          }: { taskID: string, domainModel: UpdateDomainTaskModel, todolistID: string }, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    const state = getState() as AppRootState
    const task = state.tasks[todolistID].find(el => el.id === taskID)
    if (!task) {
        return rejectWithValue('task not found!')
    }
    const apiModel: UpdateModelTask = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistApi.updateTask(todolistID, taskID, apiModel)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return {taskID, domainModel, todolistID}
        } else {
            serverAppErrorHandler(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

export const taskThunks = {updateTask, addTask, removeTask, fetchTask}
export const tasksSlice = slice.reducer
export const tasksAction = slice.actions
