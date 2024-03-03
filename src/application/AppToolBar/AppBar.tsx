import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {LinearProgress} from "@mui/material";
import React, {useCallback} from "react";
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectStatus} from "modules/app/model/appSelectors";
import {selectIsLoggedIn} from "modules/auth/model/authSelectors";
import {useActions} from "common/hooks/useActions";
import {authActions} from "modules/auth/model/authSlice";
import AppBar from "@mui/material/AppBar";

export const AppToolBar = () => {
    const status = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {logout} = useActions(authActions)

    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="Todo Lists"
                    sx={{mr: 2}}
                >
                    <Menu/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Menu
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress color="inherit"/>}
        </AppBar>
    </>
}