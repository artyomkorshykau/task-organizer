import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import React from "react";

type Props = {
    removeTodolist: (param: { todolistID: string }) => void
    id: string
}

export const DeleteTodolistButton = ({removeTodolist, id}: Props) => {
    return <>
        <IconButton aria-label="delete" onClick={() => {
            removeTodolist({todolistID: id})
        }} style={{width: '100%', borderRadius: '0px'}}>
            <Clear color={'error'}/>
        </IconButton>
    </>
}