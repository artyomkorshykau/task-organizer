import {TaskPriorities, TaskStatuses} from "common/enums/TaskStatusesEnum";

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
export type UpdateModelTask = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
}

export type UpdateDomainTaskModel = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}

export type TasksState = {
    [key: string]: Array<TaskType>
}