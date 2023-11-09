import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "app/app-reducer";
import {useAppSelector} from "app/customHooks";
import {selectError} from "app/app-selectors";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

export function ErrorSnackBar() {

    const error = useAppSelector(selectError)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC({error: null}))
    };

    const isOpen = error !== null

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error"
                       sx={{width: '100%', color: 'white'}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}