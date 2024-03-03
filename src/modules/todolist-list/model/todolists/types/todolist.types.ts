import {clearAppData} from "modules/actions/common.actions";
import {RequestStatus} from "modules/app/model/types/app.types";
import {todosActions} from "modules/todolist-list/model/todolists/todosSlice";

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

