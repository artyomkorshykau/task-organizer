import React, {useCallback, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {useAppSelector} from "common/hooks/useAppSelector";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {selectTodoList} from "features/TodolistsList/Todolist/model/todoSelector";
import {selectIsLoggedIn} from "features/auth/model/authSelectors";
import {TodolistDomain} from "features/TodolistsList/Todolist/model/types/todosSlice.types";
import {todosThunks} from "features/TodolistsList/Todolist/model/todosSlice";

export const TodolistsList = () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(selectTodoList)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const tasks = useAppSelector(state => state.tasks)


    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(todosThunks.fetchTodolists())
    }, [])


    const removeTodolistHandler = useCallback((id: string) => {
        dispatch(todosThunks.removeTodolist({todolistID: id}))
    }, [])

    const changeTodolistTitleHandler = useCallback((title: string, id: string) => {
        dispatch(todosThunks.changeTodolistTitle({title, todolistId: id}))
    }, [])

    const addTodoListHandler = useCallback((title: string) => {
        dispatch(todosThunks.addTodolist({title}))
    }, [])

    if (!isLoggedIn) return <Navigate to="/login"/>

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addTask={addTodoListHandler}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map((tl: TodolistDomain) => {
                return (<Grid item>
                    <Paper style={{padding: '10px', backgroundColor: 'transparent'}} elevation={10} square={false}>
                        <Todolist
                            todolist={tl}
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            removeTodolist={removeTodolistHandler}
                            changeTodolistTitle={changeTodolistTitleHandler}
                            tasks={tasks[tl.id]}
                        />
                    </Paper>
                </Grid>)
            })}
        </Grid>
    </>
}