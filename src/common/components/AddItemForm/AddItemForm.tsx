import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddCircleOutlined from "@mui/icons-material/AddCircleOutlined";

type Props = {
    addItem: (param: { title: string }) => Promise<any>
}

export const AddItemForm = React.memo(({addItem}: Props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = async () => {
        if (title.trim() !== "") {
            addItem({title})
                .then(()=>{
                    setTitle("")
                })
             .catch ((error) => {
                error.messages ? setError(error.messages[0]) : setError(error.message)
                })
            } else {
            setError("Title is required");
        }
    }

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
            <IconButton onClick={addTaskHandler} style={{marginLeft: '10px'}}>
                <AddCircleOutlined color='success'/>
            </IconButton>
        </div>
    )
})