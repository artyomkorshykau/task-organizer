import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd97e2ed5-672f-4df7-ab8f-20c419d5b616'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistsType[]>('todo-lists')
    },
    createTodolists(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>('todo-lists', {title})
    },
    deleteTodolists(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolists(id: string, title: string) {
        return instance.put<ResponseType<{ item: TodolistsType }>>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`)
    },
    updateTask(todolistId: string, taskID: string, model: UpdateModelTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`, model)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    }

}




// -------------------------------TYPES-------------------------------
export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number,

}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type UpdateModelTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
}
