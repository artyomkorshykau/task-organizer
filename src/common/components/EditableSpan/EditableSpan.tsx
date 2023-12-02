import React, {ChangeEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import {useActions} from "common/hooks/useActions";
import {todosActions} from "features/todolist-list/model/todolists/todosSlice";

type Props = {
    title: string
    id: string
}

export const EditableSpan = memo(({title, id}: Props) => {

    const {changeTodolistTitle} = useActions(todosActions)

    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState(title)

    const activatedEditModeHandler = () => {
        setEditMode(!editMode)
        setNewTitle(title)
    }

    const activatedViewModeHandler = () => {
        setEditMode(false);
        changeTodolistTitle({title: newTitle, todolistId: id})
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    return (
        editMode ?
            <TextField id="standard-basic" variant="standard" value={newTitle} onBlur={activatedViewModeHandler}
                       autoFocus onChange={changeTitle}/> :
            <span onDoubleClick={activatedEditModeHandler}>{title}</span>
    );
});

