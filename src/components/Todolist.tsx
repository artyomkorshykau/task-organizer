import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Clear from "@mui/icons-material/Clear";
import {FilterValuesType} from "../AppRedux";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {addTaskTC, fetchTaskTC} from "../state/tasks-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {changeTodolistFilterAC, TodolistDomainType} from "../state/todolist-reducer";


export const Todolist = React.memo((props: PropsType) => {
    console.log(props.todolist)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTaskTC(props.id))
    }, [])

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])


    const onClickHandler = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, props.id))
    }, [props.id])


    let tasksForTodolist = tasks;
    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <IconButton aria-label="delete" onClick={() => {
            props.removeTodolist(props.id)
        }} style={{width: '100%', borderRadius: '0px'}}>
            <Clear color={'warning'}/>
        </IconButton>
        <h3 style={{textAlign: 'center'}}><EditableSpan title={props.title} onChange={props.changeTodolistTitle}
                                                        id={props.id}/>
        </h3>
        <AddItemForm addTask={addTask}/>
        <div style={{padding: '0px'}}>
            {
                tasksForTodolist.map(t => <Task task={t} todolistID={props.id} key={t.id}/>)
            }
        </div>
        <div style={{textAlign: 'center'}}>
            <ButtonGroup size="small" aria-label="small button group">
                <Button variant={props.todolist.filter === 'all' ? "contained" : "outlined"}
                        onClick={() => {
                            onClickHandler('all', props.id)
                        }}>All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? "contained" : "outlined"}
                        onClick={() => {
                            onClickHandler('active', props.id)
                        }}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? "contained" : "outlined"}
                        onClick={() => {
                            onClickHandler('completed', props.id)
                        }}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
})

// -------------------------------TYPES-------------------------------
type PropsType = {
    id: string
    title: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (title: string, id: string) => void
    todolist: TodolistDomainType


}

