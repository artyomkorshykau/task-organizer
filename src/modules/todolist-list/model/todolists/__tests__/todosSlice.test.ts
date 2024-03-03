import {v1} from "uuid";
import {RequestStatus} from "modules/app/model/types/app.types";
import {todolistsSlice, todosActions} from "modules/todolist-list/model/todolists/todosSlice";
import {FilterValues, Todolist, TodolistDomain} from "modules/todolist-list/model/todolists/types/todolist.types";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomain> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsSlice(startState, todosActions.removeTodolist.fulfilled({id: todolistId1}, 'requestId', {todolistID: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolist: Todolist = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }


    const endState = todolistsSlice(startState, todosActions.addTodolist.fulfilled({todolist}, "requestId", {title: todolist.title}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    let payload = {todolistId: todolistId2, title: newTodolistTitle}
    const action = todosActions.changeTodolistTitle.fulfilled(payload, "requestId", payload)

    const endState = todolistsSlice(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValues = 'completed'

    const action = todosActions.changeTodolistFilter({id: todolistId2, filter: newFilter})

    const endState = todolistsSlice(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be added', () => {

    let payload = {todolists: startState}
    const action = todosActions.fetchTodolists.fulfilled(payload, "requestId", undefined)

    const endState = todolistsSlice([], action)

    expect(endState.length).toBe(2)
})
test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatus = 'loading'

    const action = todosActions.changeTodolistEntityStatus({id: todolistId2, status: newStatus})

    const endState = todolistsSlice(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})



