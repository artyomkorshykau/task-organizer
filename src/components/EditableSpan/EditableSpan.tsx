import React, {ChangeEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";

const EditableSpan = memo((props: EditableSpanPropsType) => {


    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activatedEditMode = () => {
        setEditMode(!editMode)
        setTitle(props.title)
    }

    const activatedViewMode = () => {
        setEditMode(false);
        props.onChange(title, props.id);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode ?
            <TextField id="standard-basic" variant="standard" value={title} onBlur={activatedViewMode}
                       autoFocus onChange={changeTitle}/> :
            <span onDoubleClick={activatedEditMode}>{props.title}</span>
    );
});

export default EditableSpan;

// -------------------------------TYPES-------------------------------
type EditableSpanPropsType = {
    title: string
    onChange: (title: string, tdID: string) => void
    id: string
}