import React, {ChangeEvent, useCallback} from "react";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {TaskStatuses} from "common/enums/TaskStatusesEnum";
import {TaskType} from '../types/task.types'
import {taskThunks} from "features/TodolistsList/Todolist/ui/Task/model/tasksSlice";

export const Task = React.memo((props: Props) => {
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(taskThunks.updateTask({
            taskID: props.task.id,
            domainModel: {status: newIsDoneValue},
            todolistID: props.todolistID
        }))
    }, [props.task.id, props.todolistID])

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(taskThunks.updateTask({taskID: props.task.id, domainModel: {title: title}, todolistID: props.todolistID}))
    }, [props.task.id, props.todolistID])

    const removeTaskHandler = useCallback(() => {
        dispatch(taskThunks.removeTask({taskId: props.task.id, todolistId: props.todolistID}))
    }, [props.task.id, props.todolistID])

    return <div key={props.task.id}>

        <IconButton aria-label="delete" onClick={removeTaskHandler}>
            <HighlightOffOutlined color='error'/>
        </IconButton>

        <Checkbox onChange={changeTaskStatusHandler} checked={props.task.status !== TaskStatuses.New} color="primary"/>

        <span className={props.task.status == TaskStatuses.Completed ? "is-done" : ""}>
            <EditableSpan title={props.task.title} onChange={changeTaskTitleHandler} id={props.task.id}/>
        </span>
    </div>
})

// -------------------------------TYPES-------------------------------
type Props = {
    task: TaskType
    todolistID: string
}