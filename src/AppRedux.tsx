import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType,
} from "./state/todolist-reducer";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskType} from "./api/todolists-api";
import {useSelector} from "react-redux";


function AppRedux() {

    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoList)


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [])

    const changeTodolistTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodolistTitleTC(title, id))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])


    return (
        <div className="App">
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addTask={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return (<Grid item>
                            <Paper style={{padding: '10px', backgroundColor: 'antiquewhite'}}>
                                <Todolist
                                    todolist={tl}
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppRedux;

// -------------------------------TYPES-------------------------------
export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
