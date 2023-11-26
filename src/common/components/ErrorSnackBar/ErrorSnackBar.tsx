import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from "react-redux";
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectError} from "features/app/model/appSelectors";
import {appActions} from "features/app/model/appSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

export const ErrorSnackBar = () => {

    const error = useAppSelector(selectError)
    const dispatch = useDispatch()

    const closeHandler = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;

        dispatch(appActions.setAppErrorAC({error: null}))
    };

    const isOpen = error !== null

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={closeHandler}>
                <Alert onClose={closeHandler} severity="error"
                       sx={{width: '100%', color: 'white'}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
};