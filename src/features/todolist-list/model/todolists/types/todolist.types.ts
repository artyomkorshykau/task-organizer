import {clearAppData} from "features/actions/common.actions";
import {RequestStatus} from "features/app/model/types/app.types";
import {todosActions} from "features/todolist-list/model/todolists/todosSlice";

export type TodolistDomain = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export  type TodosAction =
    | ReturnType<typeof todosActions.changeTodolistTitle>
    | ReturnType<typeof todosActions.changeTodolistFilter>
    | ReturnType<typeof clearAppData>

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number,
}

export type FilterValues = "all" | "active" | "completed";

