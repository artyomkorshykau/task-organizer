import { BaseResponseType } from "features/todolist-list/api/types/api.types";
import { LoginParams } from "features/auth/ui/login/types/login.types";
import { instance } from "features/todolist-list/api/common.api";

export const authAPI = {
  auth(data: LoginParams) {
    return instance.post<BaseResponseType<{ userId?: number }>>("auth/login", {
      email: "butovichjunior@gmail.com",
      password: '8mjfyrVNN5G!MW2',
      rememberMe: false
    });
  },
  me() {
    return instance.get<BaseResponseType<{
      id: 29875,
      email: "butovichjunior@gmail.com",
      login: "artyomKorshykau"
    }
    >>("auth/me");
  },
  logout() {
    return instance.delete<BaseResponseType>("auth/login");
  }
};