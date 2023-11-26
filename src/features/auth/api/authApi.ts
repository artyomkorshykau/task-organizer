import {ResponseType} from "features/TodolistsList/Todolist/api/todolistApi.types";
import { instance } from "features/TodolistsList/Todolist/api/common.api";
import { LoginParams } from "../ui/Login/login.types";

export const authAPI = {
    auth(data: LoginParams) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}