import {TaskType} from "features/todolist-list/model/tasks/types/tasks.types";

export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: Array<{ field: string, error: string }>
    data: D
}

export type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTodolistTitleArg = {
    todolistId: string;
    title: string;
};
