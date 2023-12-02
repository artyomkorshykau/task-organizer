import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootState} from "common/utils/types/utils.types";

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector