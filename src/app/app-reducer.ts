const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS' : {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}

// -------------------------------ACTION CREATORS-------------------------------
export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status}) as const
export const setErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error}) as const

// -------------------------------TYPES-------------------------------
type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionAppType =
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>