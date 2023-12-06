import React from "react";
import {TaskStatuses} from "common/enums/TaskStatusesEnum";
import {TaskType} from "features/todolist-list/model/tasks/types/tasks.types";
import {TodolistDomain} from "features/todolist-list/model/todolists/types/todolist.types";
import {Task} from "features/todolist-list/ui/Todolist/Tasks/Task/Task";

type Props = {
    id: string
    tasks: TaskType[]
    todolist: TodolistDomain
}

export const Tasks = ({id, tasks, todolist}: Props) => {

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    if (todolist.filter === "completed") tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);

    return <div style={{padding: '0px', color: 'white'}}>
        {
            tasksForTodolist.map(t => <Task task={t} todolistID={id} key={t.id}/>)
        }
        {!tasks.length &&
            <span style={{padding: '10px', color: 'black', fontStyle: ' italic'}}>Create your first task!</span>}
    </div>
}