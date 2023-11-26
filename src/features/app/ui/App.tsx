import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "features/TodolistsList/TodolistsList";
import {LinearProgress} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ErrorSnackBar} from "common/components/ErrorSnackBar/ErrorSnackBar";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectInitialized, selectStatus} from "features/app/model/appSelectors";
import {selectIsLoggedIn} from "features/auth/model/authSelectors";
import {Login} from "features/auth/ui/Login/Login";
import {authThunks} from "features/auth/model/authSlice";


export const App = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    const initialized = useAppSelector(selectInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        dispatch(authThunks.initializedApp())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(authThunks.logout())
    }, [])


    if (!initialized) {
        return <div style={{position: 'fixed', top: '0', textAlign: 'center', width: '100%'}}>
            <LinearProgress color="secondary"/>
        </div>
    }

    return (
            <div>
                <ErrorSnackBar/>
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
                            Todo Lists
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="inherit"/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
    )
};





