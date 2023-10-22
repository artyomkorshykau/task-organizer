import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppActionType} from "../app/store";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Error'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<AppActionType>) => {
    dispatch(setErrorAC(message ? message : 'Error'))
    dispatch(setStatusAC('failed'))
}