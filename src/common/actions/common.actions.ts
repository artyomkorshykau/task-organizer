import {createAction} from "@reduxjs/toolkit";
import {TasksStateType} from "redux/tasks-reducer";
import {TodolistDomainType} from "redux/todolist-reducer";

export const clearAppData = createAction<ClearAppDataType>('common/clear-app-data')

export type ClearAppDataType = {
    tasks: TasksStateType,
    todos: TodolistDomainType[]
}