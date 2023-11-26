import {ResponseType} from "features/TodolistsList/Todolist/api/todolistApi.types";
import {Dispatch} from "redux";
import {appActions} from "features/app/model/appSlice";

/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате ResponseType<D>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */

export const serverAppErrorHandler = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppErrorAC({error: data.messages ? data.messages[0] : 'Some error'}))
    }

    dispatch(appActions.setAppStatusAC({status: 'failed'}))
}