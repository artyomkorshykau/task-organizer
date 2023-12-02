import {useActions} from "common/hooks/useActions";
import {todosActions} from "features/todolist-list/model/todolists/todosSlice";
import Button from "@mui/material/Button";
import {FilterValues, TodolistDomain} from "features/todolist-list/model/todolists/types/todolist.types";
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
            <ButtonGroup size="small" aria-label="small button group" style={{paddingTop: '20px'}}>
                <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler('all')}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler('active')}
                        color={'primary'}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler('completed')}
                        color={'secondary'}>Completed
                </Button>
            </ButtonGroup>
        </div>
    )
}
