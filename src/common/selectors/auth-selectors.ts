import {AppRootStateType} from "redux/store";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn