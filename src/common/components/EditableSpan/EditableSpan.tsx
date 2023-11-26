import React, {ChangeEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import {EditableSpanProps} from "common/components/EditableSpan/editableSpan.types";

export const EditableSpan = memo((props: EditableSpanProps) => {


    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activatedEditModeHandler = () => {
        setEditMode(!editMode)
        setTitle(props.title)
    }

    const activatedViewModeHandler = () => {
        setEditMode(false);
        props.onChange(title, props.id);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode ?
            <TextField id="standard-basic" variant="standard" value={title} onBlur={activatedViewModeHandler}
                       autoFocus onChange={changeTitle}/> :
            <span onDoubleClick={activatedEditModeHandler}>{props.title}</span>
    );
});

