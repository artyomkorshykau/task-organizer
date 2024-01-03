import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddCircleOutlined from "@mui/icons-material/AddCircleOutlined";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import {useActions} from "common/hooks/useActions";
import {appActions} from "features/app/model/appSlice";

type Props = {
    addItem: (param: { title: string }) => Promise<any>
}

export const AddItemForm = React.memo(({addItem}: Props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const {setAppError} = useActions(appActions)

    const addItemHandler = async () => {
        if (title.trim() !== "") {
            addItem({title})
                .then(() => {
                    setTitle("")
                })
                .catch((error) => {
                    if (error.messages) {
                        setError(error.messages[0])
                        setAppError({error: null})
                    } else {
                        setAppError({error: error.message})
                    }
                })
        } else {
            setError("Title is required");
        }
    }

    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const KeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (e.charCode === 13) addItemHandler();
    }


    return (
        <div style={{width: '280px'}}>
            <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={1}
                value={title}
                onChange={ChangeHandler}
                onKeyPress={KeyPressHandler}
                size="small"
                error={!!error}
                helperText={error}
                style={{width: '82%'}}
            />
            <IconButton onClick={addItemHandler} style={{marginLeft: '10px'}}>
                <AddBoxIcon fontSize={'medium'}/>
            </IconButton>
        </div>
    )
})