import React, {useCallback} from 'react';
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {useActions} from "common/hooks/useActions";
import {taskActions} from "modules/todolist-list/model/tasks/tasksSlice";
import {TodolistDomain} from "modules/todolist-list/model/todolists/types/todolist.types";
import {TaskType} from "modules/todolist-list/model/tasks/types/tasks.types";
import {Tasks} from "modules/todolist-list/ui/Todolist/Tasks/Tasks";
import {DeleteTodolistButton} from "modules/todolist-list/ui/Todolist/DeleteTodlistButton/DeleteTodlistButton";
import {FilterTasksButtons} from "modules/todolist-list/ui/Todolist/FilterTasksButton/FilterTasksButton";
import {TodolistTitle} from "modules/todolist-list/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
    id: string
    title: string
    removeTodolist: (param: { todolistID: string }) => void
    todolist: TodolistDomain
    tasks: TaskType[]
}

export const Todolist = React.memo((props: Props) => {
    const {id, todolist, removeTodolist, title, tasks} = props

    const {addTask} = useActions(taskActions)

    const addTaskHandler = useCallback(async (param: { title: string }) => {
        return addTask({todolistID: id, title: param.title}).unwrap()
    }, [id])

    return <div>
        <DeleteTodolistButton removeTodolist={removeTodolist} id={id}/>
        <TodolistTitle title={title} id={id}/>
        <AddItemForm addItem={addTaskHandler}/>
        <Tasks id={id} tasks={tasks} todolist={todolist}/>
        <FilterTasksButtons todolist={todolist}/>
    </div>
})
