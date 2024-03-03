import {instance} from "./common.api"
import {BaseResponseType} from 'modules/todolist-list/api/types/api.types'
import {Todolist} from "modules/todolist-list/model/todolists/types/todolist.types";

export const todolistApi = {
    getTodolist() {
        return instance.get<Todolist[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: Todolist }>>('todo-lists', {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(id: string, title: string) {
        console.log(id, title)
        return instance.put<BaseResponseType>(`todo-lists/${id}`, {title: title})
    },
}


