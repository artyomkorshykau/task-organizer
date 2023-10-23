import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionAuthType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGGED-IN' :
            return {...state, isLoggedIn: action.value}
        default:
            return {...state}
    }
}

// -------------------------------ACTION CREATORS-------------------------------
export const setIsLoggedIn = (value: boolean) =>
    ({type: 'AUTH/SET-LOGGED-IN', value}) as const


// -------------------------------THUNK CREATORS-------------------------------
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.auth(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}
export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}

// -------------------------------TYPES-------------------------------
export type ActionAuthType =
    | ReturnType<typeof setIsLoggedIn>

type InitialStateType = {
    isLoggedIn: boolean
}