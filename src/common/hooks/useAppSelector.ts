import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootState} from "redux/store";

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector