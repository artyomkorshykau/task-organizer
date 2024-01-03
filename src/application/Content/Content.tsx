import { Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/todolist-list/ui/TodolistsList";
import { Login } from "features/auth/ui/login/Login";
import Container from "@mui/material/Container";
import React from "react";

export const Content = () => {
  return <>
    <Container fixed style={{ maxWidth: "100%" }}>
      <Routes>
        <Route path={"*"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </Container>
  </>;
};