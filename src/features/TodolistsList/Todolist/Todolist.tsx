import React, {useCallback} from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Clear from "@mui/icons-material/Clear";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {TaskStatuses} from "common/enums/TaskStatusesEnum";
import {FilterValues, todosActions} from "features/TodolistsList/Todolist/model/todosSlice";
import {TodosProps} from "features/TodolistsList/Todolist/types/todolist.types";
import {Task} from "features/TodolistsList/Todolist/ui/Task/ui/Task";
import {taskThunks} from "features/TodolistsList/Todolist/ui/Task/model/tasksSlice";


export const Todolist = React.memo((props: TodosProps) => {

    const dispatch = useAppDispatch()

    const changeTodolistFilterHandler = useCallback((value: FilterValues, todolistId: string) => {
        dispatch(todosActions.changeTodolistFilterAC({id: todolistId, filter: value}))
    }, [])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(taskThunks.addTask({todolistID: props.id, title}))
    }, [props.id])


    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    if (props.todolist.filter === "completed") tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);


    return <div>
        <IconButton aria-label="delete" onClick={() => {
            props.removeTodolist(props.id)
        }} style={{width: '100%', borderRadius: '0px'}}>
            <Clear color={'error'}/>
        </IconButton>
        <h3 style={{textAlign: 'center', color: 'white'}}><EditableSpan title={props.title}
                                                                        onChange={props.changeTodolistTitle}
                                                                        id={props.id}/>
        </h3>
        <AddItemForm addTask={addTaskHandler}/>
        <div style={{padding: '0px', color: 'white'}}>
            {
                tasksForTodolist.map(t => <Task task={t} todolistID={props.id} key={t.id}/>)
            }
        </div>
        <div style={{textAlign: 'center'}}>
            <ButtonGroup size="small" aria-label="small button group" style={{paddingTop: '20px'}}>
                <Button variant={props.todolist.filter === 'all' ? "contained" : "outlined"}
                        onClick={() => {
                            changeTodolistFilterHandler('all', props.id)
                        }}>All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? "contained" : "outlined"}
                        onClick={() => {
                            changeTodolistFilterHandler('active', props.id)
                        }}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? "contained" : "outlined"}
                        onClick={() => {
                            changeTodolistFilterHandler('completed', props.id)
                        }}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
})
