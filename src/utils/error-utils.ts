import {setAppErrorAC, setAppStatusAC} from "redux/app-reducer";
import {ResponseType} from 'api/todolists-api'
import {Dispatch} from "redux";
import {AppActionType} from "redux/store";
import {AxiosError} from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: AxiosError<{ message: string }>, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}