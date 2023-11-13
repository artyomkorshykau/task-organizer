import {AppRootStateType} from "redux/store";

export const selectTask = (state: AppRootStateType, id: string) => state.tasks[id]