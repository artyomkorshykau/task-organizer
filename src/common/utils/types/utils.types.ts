import {store} from "redux/store";

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch