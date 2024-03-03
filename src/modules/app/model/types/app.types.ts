import {appActions} from "modules/app/model/appSlice";

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppAction =
    | ReturnType<typeof appActions.setAppError>
