import {BaseResponseType} from "modules/todolist-list/api/types/api.types";
import {LoginParams} from "modules/auth/ui/login/types/login.types";
import {instance} from "modules/todolist-list/api/common.api";

export const authAPI = {
    auth(data: LoginParams) {
        return instance.post<BaseResponseType<{ userId?: number }>>('auth/login', data)
    },
    me() {
        return instance.get<BaseResponseType<{ id: number, email: string, login: string }>>('auth/me')
    },
    logout() {
        return instance.delete<BaseResponseType>('auth/login')
    }
}