import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootState} from "common/utils/types/utils.types";
import {BaseResponseType} from "features/todolist-list/api/types/api.types";

/**
 * Данная функция оборачивает функцию createAsyncThunk, что дать ей частичную типизацию
 * @param state  - Стейт всего приложения
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param rejectValue - Передаваемое значение ошибки об ошибке
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootState
    dispatch: AppDispatch
    rejectValue: null | BaseResponseType;
}>()