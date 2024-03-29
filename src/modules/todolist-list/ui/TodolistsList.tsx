import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { selectIsLoggedIn } from "modules/auth/model/authSelectors";
import { useActions } from "common/hooks/useActions";
import { selectTodoList } from "modules/todolist-list/model/todolists/todoSelector";
import { todosActions } from "modules/todolist-list/model/todolists/todosSlice";
import { TodolistDomain } from "modules/todolist-list/model/todolists/types/todolist.types";
import { selectTask } from "modules/todolist-list/model/tasks/taskSelectors";

export const TodolistsList = () => {

  const todolists = useAppSelector(selectTodoList);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const tasks = useAppSelector(selectTask);

  const { addTodolist, removeTodolist, fetchTodolists } = useActions(todosActions);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchTodolists();
  }, []);

  const addTodolistHandler = useCallback((param: { title: string }) => {
    return addTodolist({ title: param.title }).unwrap();
  }, []);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return <>
    <Grid container style={{ margin: "20px 0" }}>
      <p style={{ fontStyle: "italic", marginRight: "20px" }}>Create todolist</p>
      <AddItemForm addItem={addTodolistHandler} />
    </Grid>

    <Grid container
          spacing={3}
          style={{ flexWrap: "nowrap", overflowX: "auto", maxWidth: "100%", minHeight: "100vh" }}
    >
      {todolists.map((tl: TodolistDomain) => {
        return (<Grid item>
          <Paper style={{ padding: "10px", backgroundColor: "transparent", width: "280px" }}
                 elevation={10}
                 square={false}>
            <Todolist
              todolist={tl}
              key={tl.id}
              id={tl.id}
              title={tl.title}
              removeTodolist={removeTodolist}
              tasks={tasks[tl.id]}
            />
          </Paper>
        </Grid>);
      })}
    </Grid>
  </>;
};