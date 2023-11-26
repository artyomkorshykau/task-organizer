import {instance} from "./common.api"
import {GetTaskResponse, ResponseType} from 'features/TodolistsList/Todolist/api/todolistApi.types'
import {TaskType, UpdateModelTask} from "features/TodolistsList/Todolist/ui/Task/types/task.types";
import {Todolist} from "features/TodolistsList/Todolist/types/todolist.types";

export const todolistApi = {
    getTodolist() {
        return instance.get<Todolist[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: Todolist }>>('todo-lists', {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(id: string, title: string) {
        console.log(id, title)
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`)
    },
    updateTask(todolistId: string, taskID: string, model: UpdateModelTask) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`, model)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    }
}


