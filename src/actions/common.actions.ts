import {createAction} from "@reduxjs/toolkit";
import {TodolistDomain} from "features/TodolistsList/Todolist/model/types/todosSlice.types";
import {TasksState} from "features/TodolistsList/Todolist/ui/Task/types/task.types";

export const clearAppData = createAction<ClearAppData>('common/clear-app-data')

export type ClearAppData = {
    tasks: TasksState,
    todos: TodolistDomain[]
}