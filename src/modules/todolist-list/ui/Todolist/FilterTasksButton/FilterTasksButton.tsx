import {useActions} from "common/hooks/useActions";
import {todosActions} from "modules/todolist-list/model/todolists/todosSlice";
import Button from "@mui/material/Button";
import {FilterValues, TodolistDomain} from "modules/todolist-list/model/todolists/types/todolist.types";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

type Props = {
    todolist: TodolistDomain
}

export const FilterTasksButtons = ({todolist}: Props) => {
    const {changeTodolistFilter} = useActions(todosActions)

    const changeFilterHandler = (filter: FilterValues) => {
        changeTodolistFilter({filter, id: todolist.id})
    }

    return (
        <div style={{textAlign: 'center'}}>
            <ButtonGroup size="small" aria-label="small button group" style={{marginTop: '20px'}}>
                <Button variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('all')}
                        color={'primary'}
                >All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('active')}
                        color={'primary'}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('completed')}
                        color={'success'}>Completed
                </Button>
            </ButtonGroup>
        </div>
    )
}
