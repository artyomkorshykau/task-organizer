import {Dispatch} from "redux";
import axios from "axios";
import {appActions} from "features/app/model/appSlice";

/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при отсутствии интернета.
 * @param error  - ответ от сервера в формате ResponseType<D>
 * @param dispatch - функция для отправки сообщений в store Redux
 */

export const serverNetworkErrorHandler = (error: unknown, dispatch: Dispatch): void => {
    let errorMessage = "Some error occurred";

    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error?.message || errorMessage;
    } else if (error instanceof Error) {
        errorMessage = `Native error: ${error.message}`;
    } else {
        errorMessage = JSON.stringify(error);
    }

    dispatch(appActions.setAppErrorAC({error: errorMessage}));
    dispatch(appActions.setAppStatusAC({status: "failed"}));
};