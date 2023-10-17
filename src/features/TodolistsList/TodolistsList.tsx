import React, {useCallback, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from "./todolist-reducer";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList: React.FC = () => {

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

    return <>
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
    </>
}