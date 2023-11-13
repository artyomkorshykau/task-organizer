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
import {ErrorSnackBar} from "components/ErrorSnackBar/ErrorSnackBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "features/Login/Login";
import {logoutTC} from "redux/auth-reducer";
import {useAppDispatch, useAppSelector} from "utils/customHooks";
import {selectInitialized, selectStatus} from "utils/app-selectors";
import {selectIsLoggedIn} from "common/selectors/auth-selectors";
import {initializedAppTC} from "redux/app-reducer";


function App() {

    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    const initialized = useAppSelector(selectInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

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



