import {AppRootStateType} from "app/store";

export const selectTask = (state: AppRootStateType, id: string) => state.tasks[id]