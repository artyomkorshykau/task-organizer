import {instance} from "features/todolist-list/api/common.api";
import {TaskType, UpdateModelTask} from "features/todolist-list/model/tasks/types/tasks.types";
import {GetTaskResponse} from "features/todolist-list/api/types/api.types";
import {BaseResponseType} from 'features/todolist-list/api/types/api.types'

export const tasksApi = {

    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`)
    },
    updateTask(todolistId: string, taskID: string, model: UpdateModelTask) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`, model)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    }
}