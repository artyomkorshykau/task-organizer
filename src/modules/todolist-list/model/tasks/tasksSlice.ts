import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {ResultCode} from "common/enums/ResultCodeEnum";
import {
    RemoveTask,
    TasksState,
    TaskType,
    UpdateDomainTaskModel,
    UpdateModelTask,
    UpdateTask
} from "modules/todolist-list/model/tasks/types/tasks.types";
import {todosActions} from "modules/todolist-list/model/todolists/todosSlice";
import {AppRootState} from "common/utils/types/utils.types";
import {clearAppData} from "modules/actions/common.actions";
import {tasksApi} from "modules/todolist-list/api/tasksApi";

const slice = createSlice({
    name: 'task',
    initialState: {} as TasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todosActions.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todosActions.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todosActions.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(el => state[el.id] = [])
            })
            .addCase(clearAppData, (state, action) => {
                return action.payload.tasks
            })
            .addCase(taskActions.fetchTask.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks
            })
            .addCase(taskActions.removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(el => el.id === action.payload.taskId)
                if (index > -1) tasks.splice(index, 1)
            })
            .addCase(taskActions.addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(taskActions.updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistID]
                const index = tasks.findIndex(el => el.id === action.payload.taskID)
                if (index > -1) tasks[index] = {...tasks[index], ...action.payload.domainModel}
            })
    }
})

const fetchTask = createAppAsyncThunk<{ tasks: TaskType[], todoListId: string }, string>(`${slice.name}/fetchTasks`, async (todoListId, _) => {
    const res = await tasksApi.getTasks(todoListId)
    return {todoListId, tasks: res.data.items}
})

const removeTask = createAppAsyncThunk<RemoveTask, RemoveTask>(`${slice.name}/removeTask`, async (param, {rejectWithValue}) => {
    const res = await tasksApi.deleteTask(param.todolistId, param.taskId)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
        return {taskId: param.taskId, todolistId: param.todolistId}
    } else {
        return rejectWithValue(res.data)
    }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistID: string, title: string }>(`${slice.name}/addTasks`, async (param, {rejectWithValue}) => {
    const res = await tasksApi.createTask(param.todolistID, param.title)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
        return {task: res.data.data.item}
    } else {
        return rejectWithValue(res.data)
    }
})



const updateTask = createAppAsyncThunk<UpdateTask, UpdateTask>(`${slice.name}/updateTask`, async ({
                                                                                                      taskID,
                                                                                                      domainModel,
                                                                                                      todolistID
                                                                                                  }: { taskID: string, domainModel: UpdateDomainTaskModel, todolistID: string }, {rejectWithValue, getState}) => {
    const state = getState() as AppRootState
    const task = state.tasks[todolistID].find(el => el.id === taskID)
    if (!task) {
        return rejectWithValue(null)
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
        const res = await tasksApi.updateTask(todolistID, taskID, apiModel)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return {taskID, domainModel, todolistID}
        } else {
            return rejectWithValue(null)
        }
})

export const taskActions = {updateTask, addTask, removeTask, fetchTask}
export const tasksSlice = slice.reducer
