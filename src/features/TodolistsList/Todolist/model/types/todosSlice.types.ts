import {FilterValues, todosActions} from "features/TodolistsList/Todolist/model/todosSlice";
import {clearAppData} from "actions/common.actions";
import {Todolist} from "features/TodolistsList/Todolist/types/todolist.types";
import {RequestStatus} from "features/app/model/types/appSlice.types";

export type TodolistDomain = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export  type TodosAction =
    | ReturnType<typeof todosActions.changeTodolistTitleAC>
    | ReturnType<typeof todosActions.changeTodolistFilterAC>
    | ReturnType<typeof clearAppData>

