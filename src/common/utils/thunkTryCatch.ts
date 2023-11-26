import {AppDispatch, AppRootState} from "redux/store";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {appActions} from "features/app/model/appSlice";
import {serverNetworkErrorHandler} from "common/utils/serverNetworkErrorHandler";

/**
 * Данная функция позволяет нам избежать дублирования кода и повторного использования try-catch блоков в каждом из thunk.
 * @param thunkAPI  - объект, содержащий все параметры, которые обычно передаются в функцию Redux thunk
 * @param logic - это функция, которую мы хотим выполнить с помощью try-catch.
 */

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootState, unknown, AppDispatch, null | ResponseType>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appActions.setAppStatusAC({status: "loading"}));
    try {
        return await logic();
    } catch (e) {
        serverNetworkErrorHandler(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatusAC({status: "idle"}));
    }
};