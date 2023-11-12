import {createAction} from "@reduxjs/toolkit";
import {TaskType} from "api/todolists-api";
import {TodolistDomainType} from "features/TodolistsList/todolist-reducer";
import {TasksStateType} from "features/TodolistsList/tasks-reducer";

export const clearAppData = createAction<ClearAppDataType>('common/clear-app-data')

export type ClearAppDataType = {
    tasks: TasksStateType,
    todos: TodolistDomainType[]
}