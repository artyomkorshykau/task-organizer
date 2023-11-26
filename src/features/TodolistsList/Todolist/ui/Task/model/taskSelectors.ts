import {AppRootState} from "redux/store";

export const selectTask = (state: AppRootState, id: string) => state.tasks[id]