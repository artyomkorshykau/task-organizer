import React, {ChangeEvent, useCallback} from "react";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {TaskStatuses} from "common/enums/TaskStatusesEnum";
import {useActions} from "common/hooks/useActions";
import {taskActions} from "features/todolist-list/model/tasks/tasksSlice";
import {TaskType} from "features/todolist-list/model/tasks/types/tasks.types";
import style from './Task.module.css'

type Props = {
    task: TaskType
    todolistID: string
}

export const Task = React.memo(({task, todolistID}: Props) => {

    const {updateTask, removeTask} = useActions(taskActions)

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        updateTask({
            taskID: task.id,
            domainModel: {status: newIsDoneValue},
            todolistID: todolistID
        })
    }, [task.id, todolistID])
    const removeTaskHandler = useCallback(() => {
        removeTask({taskId: task.id, todolistId: todolistID})
    }, [task.id, todolistID])

    return <div key={task.id}>

        <IconButton aria-label="delete" onClick={removeTaskHandler}>
            <HighlightOffOutlined color='error'/>
        </IconButton>

        <Checkbox onChange={changeTaskStatusHandler} checked={task.status !== TaskStatuses.New} color="primary"/>

        <span className={task.status == TaskStatuses.Completed ? style.isDone : ""}>
            <EditableSpan title={task.title} id={task.id}/>
        </span>
    </div>
})

