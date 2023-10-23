import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useAppDispatch} from "./customHooks";
import {logoutTC} from "../features/Login/auth-reducer";


function App() {

    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])


    if (!initialized) {
        return <div style={{position: 'fixed', top: '0', textAlign: 'center', width: '100%'}}>
            <LinearProgress color="secondary"/>
        </div>
    }

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}


export default App;



