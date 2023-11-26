import {TaskType} from "features/TodolistsList/Todolist/ui/Task/types/task.types";

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<{ filed: string, error: string }>
    data: D
}

export type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
