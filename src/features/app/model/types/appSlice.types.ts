import {appActions} from "features/app/model/appSlice";

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppAction =
    | ReturnType<typeof appActions.setAppStatusAC>
    | ReturnType<typeof appActions.setAppErrorAC>
