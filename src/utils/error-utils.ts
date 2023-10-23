import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppActionType} from "../app/store";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppErrorAC(message ? message : 'Error'))
    dispatch(setAppStatusAC('failed'))
}