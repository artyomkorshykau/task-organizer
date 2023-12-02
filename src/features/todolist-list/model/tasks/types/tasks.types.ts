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

export type RemoveTask = {
    todolistId: string,
    taskId: string
}

export type UpdateTask = {
    taskID: string,
    domainModel: UpdateDomainTaskModel,
    todolistID: string
}

export type UpdateDomainTaskModel = Partial<UpdateModelTask>

export type TasksState = Record<string, TaskType[]>