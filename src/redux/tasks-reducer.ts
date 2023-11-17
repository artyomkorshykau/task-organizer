import {TaskPriorities, TaskStatuses, TaskType} from "api/todolists-api";
import {createSlice} from "@reduxjs/toolkit";
import {clearAppData} from "common/actions/common.actions";
import {
    addTaskTC,
    addTodolistTC,
    fetchTaskTC,
    fetchTodolistsTC,
    removeTaskTC,
    removeTodolistTC,
    updateTaskTC
} from "redux/thunks/thunks";

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