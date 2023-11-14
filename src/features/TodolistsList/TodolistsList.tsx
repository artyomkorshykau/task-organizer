import React, {useCallback, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "utils/customHooks";
import {selectIsLoggedIn} from "common/selectors/auth-selectors";
import {selectTodoList} from "common/selectors/todo-selector";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from "redux/todolist-reducer";

export const TodolistsList: React.FC = () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(selectTodoList)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const tasks = useAppSelector(state => state.tasks)


    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC({todolistID: id}))
    }, [])

    const changeTodolistTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodolistTitleTC({title, todolistId: id}))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addTask={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map((tl: TodolistDomainType) => {
                return (<Grid item>
                    <Paper style={{padding: '10px', backgroundColor: 'transparent'}} elevation={10} square={false}>
                        <Todolist
                            todolist={tl}
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                            tasks={tasks[tl.id]}
                        />
                    </Paper>
                </Grid>)
            })}
        </Grid>
    </>
}