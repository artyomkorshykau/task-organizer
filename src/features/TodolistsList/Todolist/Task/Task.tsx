import React, {ChangeEvent, useCallback} from "react";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "api/todolists-api";
import {useAppDispatch} from "utils/customHooks";
import {removeTaskTC, updateTaskTC} from "redux/thunks/thunks";

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC({
            taskID: props.task.id,
            domainModel: {status: newIsDoneValue},
            todolistID: props.todolistID
        }))
    }, [props.task.id, props.todolistID])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC({taskID: props.task.id, domainModel: {title: title}, todolistID: props.todolistID}))
    }, [props.task.id, props.todolistID])

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC({id: props.task.id, todolistId: props.todolistID}))
    }, [props.task.id, props.todolistID])

    return <div key={props.task.id}>

        <IconButton aria-label="delete" onClick={removeTask}>
            <HighlightOffOutlined color='error'/>
        </IconButton>

        <Checkbox onChange={changeTaskStatus} checked={props.task.status !== TaskStatuses.New} color="primary"/>

        <span className={props.task.status == TaskStatuses.Completed ? "is-done" : ""}>
            <EditableSpan title={props.task.title} onChange={changeTaskTitle} id={props.task.id}/>
        </span>
    </div>
})

// -------------------------------TYPES-------------------------------
type TaskPropsType = {
    task: TaskType
    todolistID: string
}