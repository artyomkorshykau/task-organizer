import React, {useCallback, useEffect} from "react";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./todolist-reducer";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useAppDispatch, useAppSelector} from "app/customHooks";
import {Navigate} from "react-router-dom";
import {selectTodoList} from "features/TodolistsList/Todolist/todo-selector";
import {selectIsLoggedIn} from "features/Login/auth-selectors";

export const TodolistsList: React.FC = () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(selectTodoList)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)


    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
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

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addTask={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(tl => {
                return (<Grid item>
                    <Paper style={{padding: '10px', backgroundColor: 'transparent'}} elevation={10} square={false}>
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
    </>
}