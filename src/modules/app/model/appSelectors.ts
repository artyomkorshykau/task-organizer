import {AppRootState} from "common/utils/types/utils.types";

export const selectStatus = (state: AppRootState) => state.app.status
export const selectInitialized = (state: AppRootState) => state.app.initialized
export const selectError = (state: AppRootState) => state.app.error