import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddCircleOutlined from "@mui/icons-material/AddCircleOutlined";
import {AddItemProps} from "common/components/AddItemForm/addItemForm.types";

export const AddItemForm = React.memo((props: AddItemProps) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = useCallback(() => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addTask(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }, [title])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);

        if (e.charCode === 13) addTaskHandler();
    }

    return (
        <div>
            <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={1}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size="small"
                error={!!error}
                helperText={error}
                style={{width: '82%'}}
            />
            <IconButton onClick={addTaskHandler}>
                <AddCircleOutlined color='success'/>
            </IconButton>
        </div>
    )
})