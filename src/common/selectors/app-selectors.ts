import {AppRootStateType} from "redux/store";

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectInitialized = (state: AppRootStateType) => state.app.initialized
export const selectError = (state: AppRootStateType) => state.app.error