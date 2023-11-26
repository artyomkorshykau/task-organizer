import {TodolistDomain} from "features/TodolistsList/Todolist/model/types/todosSlice.types";
import {TaskType} from "features/TodolistsList/Todolist/ui/Task/types/task.types";

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number,
}

export type TodosProps = {
    id: string
    title: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (title: string, id: string) => void
    todolist: TodolistDomain
    tasks: TaskType[]
}

