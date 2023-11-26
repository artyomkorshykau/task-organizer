import {AppRootState} from "redux/store";

export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn