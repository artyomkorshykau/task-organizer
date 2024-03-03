import {AppRootState} from "common/utils/types/utils.types";

export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn