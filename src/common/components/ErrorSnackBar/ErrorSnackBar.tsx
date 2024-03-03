import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectError} from "modules/app/model/appSelectors";
import {appActions} from "modules/app/model/appSlice";
import {useActions} from "common/hooks/useActions";
import {Alert} from "common/components/ErrorSnackBar/Alert";

export const ErrorSnackBar = () => {

    const error = useAppSelector(selectError)
    const {setAppError} = useActions(appActions)

    useActions(appActions)

    const closeHandler = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickable') return;
        setAppError({error: null})
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