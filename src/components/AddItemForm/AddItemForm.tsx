import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddCircleOutlined from "@mui/icons-material/AddCircleOutlined";

export const AddItemForm = React.memo((props: AddItemPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = useCallback(() => {
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
        if (error !== null) {
            setError(null);
        }

        if (e.charCode === 13) {
            addTask();
        }
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
            <IconButton onClick={addTask}>
                <AddCircleOutlined color='success'/>
            </IconButton>
        </div>
    )
})

// -------------------------------TYPES-------------------------------
type AddItemPropsType = {
    addTask: (title: string) => void
}