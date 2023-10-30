import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppActionType} from "../app/store";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppErrorAC({error: message ? message : 'Error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}