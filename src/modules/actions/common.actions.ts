import {createAction} from "@reduxjs/toolkit";
import {TodolistDomain} from "modules/todolist-list/model/todolists/types/todolist.types";
import {TasksState} from "modules/todolist-list/model/tasks/types/tasks.types";

export const clearAppData = createAction<ClearAppData>('common/clear-app-data')

export type ClearAppData = {
    tasks: TasksState,
    todos: TodolistDomain[]
}